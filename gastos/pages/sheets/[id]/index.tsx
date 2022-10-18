import { Category, Item, Sheet } from "@prisma/client";
import { EXCHANGE_RATE } from "components/constants";
import { ItemRow } from "components/ItemRow";
import { Currency } from "lib/currency";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaPen, FaPlus, FaSun } from "react-icons/fa";
import useSWR from "swr";

const SheetPage: NextPage = () => {
  const router = useRouter();
  const sheetQuery = useSWR<Sheet & { items: Item[] }>(
    `/sheets/${router.query.id}`
  );
  const categoriesQuery = useSWR<Category[]>(`/categories`);

  const { itemsPerCategory, totalPerCategory } = useMemo(() => {
    const totalPerCategory: {
      [categoryId: string]: {
        [currency: string]: number;
      };
    } = {};
    const itemsPerCategory: { [categoryId: string]: Item[] } = {};

    if (categoriesQuery.data && sheetQuery.data) {
      for (const category of categoriesQuery.data) {
        itemsPerCategory[category.id] = [];
        totalPerCategory[category.id] = {
          [Currency.PHP]: 0,
          [Currency.SGD]: 0,
        };
      }

      for (const item of sheetQuery.data.items) {
        if (item.categoryId in itemsPerCategory) {
          itemsPerCategory[item.categoryId].push(item);
          totalPerCategory[item.categoryId][Currency.PHP] +=
            item.currency === Currency.PHP
              ? item.price
              : item.price * EXCHANGE_RATE;
          totalPerCategory[item.categoryId][Currency.SGD] +=
            item.currency === Currency.SGD
              ? item.price
              : item.price / EXCHANGE_RATE;
        }
      }
    }

    for (let key in itemsPerCategory) {
      itemsPerCategory[key].sort(
        (a, b) => +new Date(a.datetime) - +new Date(b.datetime)
      );
    }
    return { itemsPerCategory, totalPerCategory };
  }, [categoriesQuery.data, sheetQuery.data]);

  const totalSpend = useMemo(() => {
    let SGD = 0;
    let PHP = 0;

    for (let id in totalPerCategory) {
      PHP += totalPerCategory[id].PHP;
      SGD += totalPerCategory[id].SGD;
    }

    return { SGD, PHP };
  }, [totalPerCategory]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (sheetQuery.data) {
      setTimeout(() => {
        const itemEl = document.getElementById(
          window.location.hash.replace("#", "")
        );
        if (itemEl) {
          setSelectedItemId(itemEl.id.replace("item-", ""));
          itemEl.scrollIntoView({
            block: "center",
          });
        }
      }, 0);
    }
  }, [sheetQuery.data]);

  return (
    <>
      <Head>
        <title>Gastos - {sheetQuery.data?.name}</title>
      </Head>
      <div className="flex flex-col h-full bg-gray-900 relative">
        <div className="p-4 bg-blue-400 items-center flex justify-between space-x-4 text-xl text-white">
          <div className="flex space-x-4 items-center">
            <Link href="/sheets">
              <a>
                <FaChevronLeft className="text-2xl" />
              </a>
            </Link>
            <h1>{sheetQuery.data?.name}</h1>
            <Link href={`/sheets/${router.query.id}/day`}>
              <a>
                <FaSun className="text-2xl" />
              </a>
            </Link>
          </div>
          <Link href={`/edit-sheet/${router.query.id}`}>
            <a>
              <FaPen className="text-xl"></FaPen>
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          {categoriesQuery.data
            ?.filter((category) => itemsPerCategory[category.id]?.length > 0)
            .map((category) => {
              return (
                <div key={category.id}>
                  <div className="text-white p-4 bg-gray-700 font-semibold border-b border-gray-700 flex justify-between">
                    <div>{category.name}</div>
                    <div>
                      {totalPerCategory[category.id].PHP.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "SGD",
                          minimumFractionDigits: 2,
                        }
                      ).replace("SGD", "PHP")}{" "}
                      /{" "}
                      {totalPerCategory[category.id].SGD.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "SGD",
                          minimumFractionDigits: 2,
                        }
                      )}
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    {itemsPerCategory[category.id].map((item) => {
                      const selected = selectedItemId === item.id;
                      return <ItemRow key={item.id} {...{ selected, item }} />;
                    })}
                  </div>
                </div>
              );
            })}
          <div className="text-white mb-24 p-4 bg-gray-700 font-semibold border-b border-gray-700 flex justify-between">
            <div>Total</div>
            <div>
              {totalSpend.PHP.toLocaleString("en-US", {
                style: "currency",
                currency: "SGD",
                minimumFractionDigits: 2,
              }).replace("SGD", "PHP")}{" "}
              /{" "}
              {totalSpend.SGD.toLocaleString("en-US", {
                style: "currency",
                currency: "SGD",
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>

        <Link
          href={`/sheets/${router.query.id}/create-item#init-categoryId-menu`}
        >
          <a className="block absolute rounded-full p-6 text-lg bg-green-400 bottom-4 right-4 text-white">
            <FaPlus />
          </a>
        </Link>
      </div>
    </>
  );
};

export default SheetPage;
