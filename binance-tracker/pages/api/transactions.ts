import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { BinanceTransaction } from "../../src/types/BinanceTransaction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BinanceTransaction[]>
) {
  const prisma = new PrismaClient();

  const transactions = await prisma.binanceTransaction.findMany({
    orderBy: {
      createTime: "desc",
    },
  });
  prisma.$disconnect();
  res.status(200).json(transactions as BinanceTransaction[]);
}
