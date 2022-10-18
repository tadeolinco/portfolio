import { Category, Sheet } from '@prisma/client';
import { Select } from 'components/Select';
import { format } from 'date-fns';
import { api } from 'lib/api/api';
import { Currency } from 'lib/currency';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';
import useSWR from 'swr';

type CreateItemForm = {
  name: string;
  datetime: string;
  price: number;
  currency: Currency;
  categoryId: Category['id'];
};

const CreateItemPage: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit, control, watch, setFocus, setValue } =
    useForm<CreateItemForm>({
      defaultValues: {
        datetime: format(new Date(), 'yyyy-MM-dd@HH:mm').replace('@', 'T'),
      },
    });
  const categoriesQuery = useSWR<Category[]>('/categories');
  const sheetQuery = useSWR<Sheet>(
    `/sheets/${router.query.id}?excludeItems=true`,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values: CreateItemForm) => {
    setIsSubmitting(true);
    try {
      const res = await api.post('/items', {
        ...values,
        sheetId: router.query.id,
        datetime: new Date(values.datetime),
      });

      router.push(
        `/sheets/${router.query.id}${
          router.query.referrer === 'day' ? '/day' : ''
        }#item-${res.data.id}`,
      );
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const categoryId = watch('categoryId');

  useEffect(() => {
    if (sheetQuery.data) {
      setValue('currency', sheetQuery.data.defaultCurrency as Currency);
    }
  }, [setValue, sheetQuery.data]);

  useEffect(() => {
    if (categoryId) {
      setFocus('name');
    }
  }, [categoryId, setFocus]);

  useEffect(() => {
    unstable_batchedUpdates(() => {
      if (router.query.name) setValue('name', String(router.query.name));
      if (router.query.price) setValue('price', +router.query.price);
      if (router.query.categoryId)
        setValue('categoryId', String(router.query.categoryId));

      if (router.query.name || router.query.price || router.query.categoryId) {
        setTimeout(() => {
          setFocus('price');
        }, 0);
      }
    });
  }, [
    router.query.categoryId,
    router.query.name,
    router.query.price,
    setFocus,
    setValue,
  ]);

  if (!router.query.id) return null;

  let link = `/sheets/${router.query.id}`;
  if (router.query.referrer === 'day') {
    link += '/day';
  }

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex items-center space-x-4 bg-blue-400 p-4 text-xl text-white">
        <Link href={link}>
          <a>
            <FaChevronLeft className="text-2xl" />
          </a>
        </Link>
        <h1>Create Item</h1>
      </div>
      <form
        ref={formRef}
        className="flex flex-1 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4">
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  placeholder="Category"
                  options={
                    categoriesQuery.data?.map((category) => ({
                      render: category.name,
                      value: category.id,
                    })) || []
                  }
                ></Select>
              );
            }}
          ></Controller>
          <input
            type="text"
            placeholder="Name"
            className="rounded-md border border-gray-700 bg-gray-800 p-4 text-white"
            {...register('name', {
              required: true,
              minLength: 1,
            })}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setFocus('price');
              }
            }}
          ></input>
          <input
            type="number"
            placeholder="Price"
            className="rounded-md border border-gray-700 bg-gray-800 p-4 text-white"
            {...register('price', {
              required: true,
              min: 0,
            })}
            step="0.01"
          ></input>
          <Controller
            control={control}
            name="currency"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  placeholder="Currency"
                  options={[
                    { render: 'SGD', value: 'SGD' },
                    { render: 'PHP', value: 'PHP' },
                  ]}
                ></Select>
              );
            }}
          ></Controller>
          <input
            type="datetime-local"
            placeholder="Date"
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-4 text-white"
            {...register('datetime', {
              required: true,
            })}
          ></input>
        </div>
        <button
          type="submit"
          className="block bg-blue-400 p-4 text-center font-semibold text-white disabled:bg-gray-500"
          disabled={isSubmitting}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateItemPage;
