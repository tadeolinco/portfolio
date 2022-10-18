// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();

  const config = await prisma.binanceConfig.findFirst();

  if (!config) {
    return res.status(500).json([]);
  }
  const { csrftoken, pt20 } = config;

  const response = await axios.post(
    `https://www.binance.com/bapi/capital/v1/private/streamer/order/get-open-orders`,
    {},
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
        csrftoken,
        Cookie: `logined=y; p20t=${pt20};`,
        clienttype: "web",
      },
    }
  );

  res.status(200).json(
    response.data.data?.map((order: any) => ({
      buyAsset: order.baseAsset,
      buyAmount: order.origQty,
      price: order.price,
      sellAsset: order.quoteAsset,
      sellAmount: order.delegateMoney,
    })) || []
  );

  prisma.$disconnect();
}
