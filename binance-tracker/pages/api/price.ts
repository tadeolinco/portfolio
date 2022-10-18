import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();

  const map: any = {};
  const prices = await prisma.binancePrice.findMany();
  for (const price of prices) {
    if (map[price.time] === undefined) map[price.time] = {};
    map[price.time][price.symbol] = price.price;
  }
  prisma.$disconnect();
  return res.status(200).json(map);
}
