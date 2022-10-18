import { Category, Item, Sheet } from '@prisma/client';
import { EXCHANGE_RATE } from 'components/constants';
import { ItemRow } from 'components/ItemRow';
import { format, startOfDay } from 'date-fns';
import { Currency } from 'lib/currency';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { FaChevronLeft, FaPlus } from 'react-icons/fa';
import useSWR from 'swr';

const TransactionsPerDayPage: NextPage = () => {
  const router = useRouter();
  const sheetQuery = useSWR<Sheet & { items: Item[] }>(
    `/sheets/${router.query.id}`,
  );
  const categoriesQuery = useSWR<Category[]>(`/categories`);

  const categoriesMap = useMemo(() => {
    const map: { [id: string]: Category } = {};
    if (categoriesQuery.data) {
      for (const category of categoriesQuery.data) {
        map[category.id] = category;
      }
    }
    return map;
  }, [categoriesQuery.data]);

  const { itemsPerDay, totalPerDay, days, average } = useMemo(() => {
    const itemsPerDay: { [day: number]: Item[] } = {};
    const totalPerDay: { [day: number]: { PHP: 0; SGD: 0 } } = {};
    let average = 0;
    let averageWithMisc = 0;
    let firstDay = 0;
    let lastDay = 0;

    if (sheetQuery.data) {
      for (const item of sheetQuery.data.items) {
        const timestamp = +startOfDay(new Date(item.datetime));
        if (firstDay === 0 || timestamp < firstDay) firstDay = timestamp;
        if (lastDay === 0 || timestamp > lastDay) lastDay = timestamp;
        if (!itemsPerDay[timestamp]) {
          itemsPerDay[timestamp] = [];
          totalPerDay[timestamp] = {
            PHP: 0,
            SGD: 0,
          };
        }
        const phpPrice =
          item.currency === Currency.PHP
            ? item.price
            : item.price * EXCHANGE_RATE;
        const sgdPrice =
          item.currency === Currency.SGD
            ? item.price
            : item.price / EXCHANGE_RATE;

        totalPerDay[timestamp][Currency.PHP] += phpPrice;
        totalPerDay[timestamp][Currency.SGD] += sgdPrice;

        const category = categoriesMap[item.categoryId];
        if (category?.name !== 'Transportation' && category?.name !== 'Bills') {
          averageWithMisc += sgdPrice;
          if (category?.name !== 'Misc' && category?.name !== 'Games') {
            average += sgdPrice;
          }
        }

        itemsPerDay[timestamp].unshift(item);
      }
    }

    const days = [];
    for (let day = lastDay; day >= firstDay; day -= 1000 * 60 * 60 * 24) {
      days.push(day);
    }

    return {
      itemsPerDay,
      totalPerDay,
      days,
      average: average / days.length,
      averageWithMisc: averageWithMisc / days.length,
    };
  }, [categoriesMap, sheetQuery.data]);

  return (
    <>
      <Head>
        <title>Gastos - {sheetQuery.data?.name}</title>
      </Head>
      <div className="relative flex h-full flex-col bg-gray-900">
        <div className="flex items-center justify-between space-x-4 bg-blue-400 p-4 text-xl text-white">
          <div className="flex items-center space-x-4">
            <Link href={`/sheets/${router.query.id}`}>
              <a>
                <FaChevronLeft className="text-2xl" />
              </a>
            </Link>
            <h1>
              {sheetQuery.data?.name} -{' '}
              {average.toLocaleString('en-US', {
                style: 'currency',
                currency: 'SGD',
                minimumFractionDigits: 2,
              })}
            </h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {days.map((day) => {
            return (
              <div key={day}>
                <div className="flex justify-between border-b border-gray-700 bg-gray-700 px-4 py-2 font-semibold text-white">
                  <div className="-ml-4 flex-1 border-r border-gray-700 px-4 py-2 ">
                    {format(new Date(day), 'MMM dd')}
                  </div>
                  <div className="flex-1 border-r border-gray-700 px-4 py-2 text-right">
                    {(totalPerDay[day]?.PHP || 0)
                      .toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        minimumFractionDigits: 2,
                      })
                      .replace('SGD', 'PHP')}
                  </div>
                  <div className="flex-1 border-r border-gray-700 px-4 py-2 text-right">
                    {(totalPerDay[day]?.SGD || 0).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'SGD',
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="space-y-4 p-4">
                  {itemsPerDay[day]?.map((item) => {
                    return <ItemRow key={item.id} {...{ item }} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Link
          href={`/sheets/${router.query.id}/create-item?referrer=day#init-categoryId-menu`}
        >
          <a className="absolute bottom-4 right-4 block rounded-full bg-green-400 p-6 text-lg text-white">
            <FaPlus />
          </a>
        </Link>
      </div>
    </>
  );
};

export default TransactionsPerDayPage;
