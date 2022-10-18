import { Item } from '@prisma/client';
import classNames from 'classnames';
import { format } from 'date-fns';
import { api } from 'lib/api/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { mutate } from 'swr';
import { EXCHANGE_RATE } from './constants';

type ItemRowProps = {
  item: Item;
  selected?: boolean;
};

export const ItemRow = ({ item, selected = false }: ItemRowProps) => {
  const router = useRouter();
  const timerRef = useRef(0);

  const onDown = () => {
    timerRef.current = window.setTimeout(async () => {
      const confirm = window.confirm('Do you want to duplicate');
      if (confirm) {
        const res = await api.post('/items', {
          name: item.name,
          price: item.price,
          categoryId: item.categoryId,
          currency: item.currency,
          sheetId: item.sheetId,
          datetime: new Date(),
        });
        mutate(`/sheets/${router.query.id}`);
        let link = `/sheets/${item.sheetId}`;
        if (router.route === '/sheets/[id]/day') {
          link += '/day';
        }
        link += `#item-${res.data.id}`;
        router.push(link);
      }
    }, 1000);
  };

  const onUp = () => {
    clearTimeout(timerRef.current);
  };

  let link = `/sheets/${item.sheetId}/items/${item.id}`;

  if (router.route === '/sheets/[id]/day') {
    link += '?referrer=day';
  }

  return (
    <Link key={item.id} href={link}>
      <a
        id={`item-${item.id}`}
        className={classNames('block rounded-xl text-white', {
          'bg-gray-500': selected,
          'bg-gray-800': !selected,
        })}
        onMouseDown={onDown}
        onTouchStart={onDown}
        onMouseUp={onUp}
        onTouchEnd={onUp}
        onTouchMove={onUp}
      >
        <div
          className={classNames(
            'border-b border-gray-700 px-4 py-2 text-lg font-semibold',
          )}
        >
          {item.name}
        </div>
        <div className="flex">
          <div
            className={classNames('flex-1 border-r border-gray-700 px-4 py-2')}
          >
            {format(new Date(item.datetime), 'MM/dd HH:mm')}
          </div>
          <div className="flex-1 border-r border-gray-700 px-4 py-2 text-right">
            <span
              className={classNames({
                'text-green-400': item.currency === 'PHP',
                'text-gray-400': item.currency === 'SGD',
              })}
            >
              {(item.currency === 'PHP'
                ? item.price
                : item.price * EXCHANGE_RATE
              )
                .toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'SGD',
                  minimumFractionDigits: 2,
                })
                .replace('SGD', 'PHP')}
            </span>
          </div>
          <div className="flex-1 px-4 py-2 text-right">
            <span
              className={classNames({
                'text-green-400': item.currency === 'SGD',
                'text-gray-400': item.currency === 'PHP',
              })}
            >
              {(item.currency === 'SGD'
                ? item.price
                : item.price / EXCHANGE_RATE
              ).toLocaleString('en-US', {
                style: 'currency',
                currency: 'SGD',
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};
