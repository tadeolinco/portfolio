// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "lib/api/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({
      message: "Method no supported",
    });
  }

  if (req.method === "GET") {
    const categories = await prisma.category.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return res.json(categories);
  }

  if (req.method === "POST") {
    const data = req.body as { name: string };
    const categories = await prisma.category.findMany();
    const maxOrder = categories.reduce(
      (order, category) => (category.order >= order ? category.order : order),
      0
    );
    const category = await prisma.category.create({
      data: {
        name: data.name,
        order: maxOrder + 1,
      },
    });
    return res.json(category);
  }

  if (req.method === "PATCH") {
    const data = req.body as { id: string; order: number }[];
    for (const datum of data) {
      await prisma.category.update({
        where: {
          id: datum.id,
        },
        data: {
          order: datum.order,
        },
      });
    }
    res.json(
      await prisma.category.findMany({
        orderBy: {
          order: "asc",
        },
      })
    );
  }
}
