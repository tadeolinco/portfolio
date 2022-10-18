// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });
    return res.json(category);
  }

  if (req.method === "PATCH") {
    const data = req.body as { name: string }[];
    const id = req.query.id as string;
    await prisma.category.update({
      where: {
        id,
      },
      data,
    });
    res.json(await prisma.category.findFirst({ where: { id } }));
  }

  if (req.method === "DELETE") {
    const id = req.query.id as string;
    const item = await prisma.item.findFirst({
      where: {
        category: {
          id,
        },
      },
    });

    if (item) {
      return res.status(400).json({
        message: "Items exists with selected category.",
      });
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });
    res.json({});
  }
}
