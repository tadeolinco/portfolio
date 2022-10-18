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
    const sheet = await prisma.sheet.findFirst({
      where: {
        id,
      },
      include: {
        items: req.query.excludeItems !== 'true',
      },
    });
    return res.json(sheet);
  }

  if (req.method === "PATCH") {
    const data = req.body as { name: string }[];
    const id = req.query.id as string;
    await prisma.sheet.update({
      where: {
        id,
      },
      data,
    });
    res.json(await prisma.sheet.findFirst({ where: { id } }));
  }

  if (req.method === "DELETE") {
    const id = req.query.id as string;

    await prisma.$transaction([
      prisma.item.deleteMany({
        where: {
          sheet: {
            id,
          },
        },
      }),
      prisma.sheet.delete({
        where: {
          id,
        },
      }),
    ]);
    res.json({});
  }
}
