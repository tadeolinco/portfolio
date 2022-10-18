import { Category, Item } from "@prisma/client";
import { Select } from "components/Select";
import { format } from "date-fns";
import { api } from "lib/api/api";
import { Currency } from "lib/currency";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import useSWR from "swr";

type EditItemForm = {
  name: string;
  datetime: string;
  price: number;
  currency: Currency;
  categoryId: Category["id"];
};

const EditItemPage: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit, control, setFocus, setValue } =
    useForm<EditItemForm>({
      defaultValues: {
        datetime: format(new Date(), "yyyy-MM-dd@HH:mm").replace("@", "T"),
      },
    });
  const itemQuery = useSWR<Item>(`/items/${router.query.itemId}`);
  const categoriesQuery = useSWR<Category[]>("/categories");
  const onSubmit = async (values: EditItemForm) => {
    await api.patch(`/items/${router.query.itemId}`, {
      ...values,
      sheetId: router.query.id,
      datetime: new Date(values.datetime),
    });
    router.push(
      `/sheets/${router.query.id}${
        router.query.referrer === "day" ? "/day" : ""
      }#item-${router.query.itemId}`
    );
  };

  useEffect(() => {
    if (itemQuery.data) {
      setValue("name", itemQuery.data.name);
      setValue("price", itemQuery.data.price);
      setValue(
        "datetime",
        format(new Date(itemQuery.data.datetime), "yyyy-MM-dd@HH:mm").replace(
          "@",
          "T"
        )
      );
      setValue("currency", itemQuery.data.currency as Currency);
      setValue("categoryId", itemQuery.data.categoryId);
    }
  }, [itemQuery.data, setValue]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirm) {
      try {
        await api.delete(`/items/${router.query.itemId}`);
        router.push(
          `/sheets/${router.query.id}${
            router.query.referrer === "day" ? "/day" : ""
          }`
        );
      } catch (err: any) {
        alert(err.response.data.message);
      }
    }
  };

  if (!router.query.id || !router.query.itemId) return null;

  let link = `/sheets/${router.query.id}`;
  if (router.query.referrer === "day") {
    link += "/day";
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-4 bg-blue-400 flex space-x-4 text-xl items-center text-white">
        <Link href={link}>
          <a>
            <FaChevronLeft className="text-2xl" />
          </a>
        </Link>
        <h1>Edit Item</h1>
      </div>
      <form
        ref={formRef}
        className="flex flex-col flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
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
            className="p-4 border border-gray-700 text-white bg-gray-800 rounded-md"
            {...register("name", {
              required: true,
              minLength: 1,
            })}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setFocus("price");
              }
            }}
          ></input>
          <input
            type="number"
            placeholder="Price"
            className="p-4 border border-gray-700 text-white bg-gray-800 rounded-md"
            {...register("price", {
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
                    { render: "SGD", value: "SGD" },
                    { render: "PHP", value: "PHP" },
                  ]}
                ></Select>
              );
            }}
          ></Controller>
          <input
            type="datetime-local"
            placeholder="Date"
            className="p-4 border border-gray-700 w-full text-white bg-gray-800 rounded-md"
            {...register("datetime", {
              required: true,
            })}
          ></input>
        </div>
        <div className="flex">
          <button
            type="button"
            className="p-4 block flex-1 text-white bg-red-400 text-center font-semibold"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="submit"
            className="p-4 block flex-1 text-white bg-blue-400 text-center font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemPage;
