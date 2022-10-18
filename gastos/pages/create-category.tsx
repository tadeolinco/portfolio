import { api } from 'lib/api/api';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';

type CreateCategoryForm = {
  name: string;
};

const CreateCategoryPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateCategoryForm>();
  const onSubmit = async (values: CreateCategoryForm) => {
    await api.post('/categories', values);
    router.push('/categories');
  };

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex items-center space-x-4 bg-blue-400 p-4 text-xl text-white">
        <Link href="/categories">
          <a>
            <FaChevronLeft className="text-2xl" />
          </a>
        </Link>
        <h1>Create Category</h1>
      </div>
      <form
        className="flex flex-1 flex-col space-y-4 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-1 flex-col p-4">
          <input
            type="text"
            placeholder="Category name"
            className="rounded-md border border-gray-700 bg-gray-800 p-4 text-white"
            autoFocus
            {...register('name', {
              required: true,
              minLength: 1,
            })}
            autoComplete="off"
          ></input>
        </div>
        <button
          type="submit"
          className="block bg-blue-400 p-4 text-center font-semibold text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryPage;
