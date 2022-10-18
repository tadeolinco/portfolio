import { api } from 'lib/api/api';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';

type CreateSheetPageForm = {
  name: string;
};

const CreateSheetPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateSheetPageForm>();
  const onSubmit = async (values: CreateSheetPageForm) => {
    await api.post('/sheets', values);
    router.push('/sheets');
  };

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex items-center space-x-4 bg-blue-400 p-4 text-xl text-white">
        <Link href="/sheets">
          <a>
            <FaChevronLeft className="text-2xl" />
          </a>
        </Link>
        <h1>Create Sheet</h1>
      </div>
      <div className="flex flex-1 flex-col">
        <form
          className="flex flex-1 flex-col space-y-4 overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 p-4">
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
          </div>

          <button
            type="submit"
            className="block bg-blue-400 p-4 text-center font-semibold text-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSheetPage;
