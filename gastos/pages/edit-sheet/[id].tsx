import { Sheet } from '@prisma/client';
import { Select } from 'components/Select';
import { api } from 'lib/api/api';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';
import useSWR from 'swr';

type EditSheetPageForm = {
  name: string;
  defaultCurrency: string;
};

const EditSheetPage: NextPage = () => {
  const router = useRouter();
  const sheetQuery = useSWR<Sheet>(`/sheets/${router.query.id}`);
  const { register, handleSubmit, setValue, control } =
    useForm<EditSheetPageForm>();
  const onSubmit = async (values: EditSheetPageForm) => {
    await api.patch(`/sheets/${router.query.id}`, values);
    router.push(`/sheets/${router.query.id}`);
  };

  useEffect(() => {
    if (sheetQuery.data) {
      setValue('name', sheetQuery.data.name);
      setValue('defaultCurrency', sheetQuery.data.defaultCurrency);
    }
  }, [setValue, sheetQuery.data]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this sheet?',
    );
    if (confirm) {
      try {
        await api.delete(`/sheets/${router.query.id}`);
        router.push(`/sheets/${router.query.id}`);
      } catch (err: any) {
        alert(err.response.data.message);
      }
    }
  };

  if (!router.query.id) return null;

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex items-center space-x-4 bg-blue-400 p-4 text-xl text-white">
        <Link href={`/sheets/${router.query.id}`}>
          <a>
            <FaChevronLeft className="text-2xl" />
          </a>
        </Link>
        <h1>Edit Sheet</h1>
      </div>
      <form
        className="flex flex-1 flex-col space-y-4 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-1 flex-col space-y-4 p-4">
          <input
            type="text"
            placeholder="Sheet name"
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-4 text-white"
            autoFocus
            {...register('name', {
              required: true,
              minLength: 1,
            })}
            autoComplete="off"
          ></input>
          <Controller
            control={control}
            name="defaultCurrency"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  placeholder="Default Currency"
                  options={[
                    { render: 'SGD', value: 'SGD' },
                    { render: 'PHP', value: 'PHP' },
                  ]}
                ></Select>
              );
            }}
          ></Controller>
        </div>
        <div className="flex w-full">
          <button
            type="button"
            className="block flex-1 bg-red-400 p-4 text-center font-semibold text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="submit"
            className="block flex-1 bg-blue-400 p-4 text-center font-semibold text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSheetPage;
