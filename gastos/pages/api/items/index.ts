// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category, Sheet } from "@prisma/client";
import { prisma } from "lib/api/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method no supported",
    });
  }

  if (req.method === "POST") {
    const data = req.body as {
      name: string;
      datetime: string;
      price: number;
      currency: string;
      categoryId: Category["id"];
      sheetId: Sheet["id"];
    };

    const item = await prisma.item.create({
      data: {
        ...data,
        datetime: new Date(data.datetime),
        price: +data.price,
      },
    });
    return res.json(item);
  }
}
