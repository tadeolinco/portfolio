// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    await prisma.binanceConfig.deleteMany();
    await prisma.binanceConfig.create({
      data: req.body,
    });
    prisma.$disconnect();
  }

  res.status(200).json({});
}
