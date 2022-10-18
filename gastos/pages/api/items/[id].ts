// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category, Sheet } from "@prisma/client";
import { prisma } from "lib/api/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "GET" &&
    req.method !== "PATCH" &&
    req.method !== "DELETE"
  ) {
    return res.status(405).json({
      message: "Method no supported",
    });
  }

  if (req.method === "GET") {
    const id = req.query.id as string;
    const item = await prisma.item.findFirst({
      where: {
        id,
      },
    });
    return res.json(item);
  }

  if (req.method === "PATCH") {
    const id = req.query.id as string;

    const data = req.body as {
      name: string;
      datetime: string;
      price: number;
      currency: string;
      categoryId: Category["id"];
      sheetId: Sheet["id"];
    };

    const item = await prisma.item.update({
      where: {
        id,
      },
      data: {
        ...data,
        datetime: new Date(data.datetime),
        price: +data.price,
      },
    });

    res.json(await prisma.item.findFirst({ where: { id } }));
  }

  if (req.method === "DELETE") {
    const id = req.query.id as string;

    await prisma.item.delete({
      where: {
        id,
      },
    }),
      res.json({});
  }
}
