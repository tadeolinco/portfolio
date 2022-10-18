import { Category } from '@prisma/client';
import { api } from 'lib/api/api';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';
import useSWR from 'swr';

type EditCategoryPageForm = {
  name: string;
};

const EditCategoryPage: NextPage = () => {
  const router = useRouter();
  const categoryQuery = useSWR<Category>(`/categories/${router.query.id}`);
  const { register, handleSubmit, setValue } = useForm<EditCategoryPageForm>();
  const onSubmit = async (values: EditCategoryPageForm) => {
    await api.patch(`/categories/${router.query.id}`, values);
    router.push('/categories');
  };

  useEffect(() => {
    if (categoryQuery.data) {
      setValue('name', categoryQuery.data.name);
    }
  }, [setValue, categoryQuery.data]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this category?',
    );
    if (confirm) {
      try {
        await api.delete(`/categories/${router.query.id}`);
        router.push('/categories');
      } catch (err: any) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex items-center space-x-4 bg-blue-400 p-4 text-xl text-white">
        <Link href="/categories">
          <a>
            <FaChevronLeft className="text-2xl" />
          </a>
        </Link>
        <h1>Edit Category</h1>
      </div>
      <div className="flex flex-1 flex-col">
        <form
          className="flex flex-1 flex-col space-y-4 overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 p-4">
            <input
              type="text"
              placeholder="Category name"
              className="w-full rounded-md border border-gray-700 bg-gray-800 p-4 text-white"
              autoFocus
              {...register('name', {
                required: true,
                minLength: 1,
              })}
              autoComplete="off"
            ></input>
          </div>
          <div className="flex  w-full">
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
    </div>
  );
};

export default EditCategoryPage;
