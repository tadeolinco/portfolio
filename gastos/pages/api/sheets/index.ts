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
    const sheets = await prisma.sheet.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return res.json(sheets);
  }

  if (req.method === "POST") {
    const data = req.body as { name: string };
    const sheets = await prisma.sheet.findMany();
    const maxOrder = sheets.reduce(
      (order, sheet) => (sheet.order >= order ? sheet.order : order),
      0
    );
    const sheet = await prisma.sheet.create({
      data: {
        name: data.name,
        order: maxOrder + 1,
      },
    });
    return res.json(sheet);
  }

  if (req.method === "PATCH") {
    const data = req.body as { id: string; order: number }[];
    for (const datum of data) {
      await prisma.sheet.update({
        where: {
          id: datum.id,
        },
        data: {
          order: datum.order,
        },
      });
    }
    res.json(
      await prisma.sheet.findMany({
        orderBy: {
          order: "asc",
        },
      })
    );
  }
}
