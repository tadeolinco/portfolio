// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { uniqBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { getConverts } from "../../src/api-handlers/getConverts";
import { getDirectBuyTransactions } from "../../src/api-handlers/getDirectBuyTransactions";
import { getEth2Rewards } from "../../src/api-handlers/getEth2Rewards";
import { getManualTransactions } from "../../src/api-handlers/getManualTransactions";
import { getP2PTransactions } from "../../src/api-handlers/getP2PTransactions";
import { getSavingsPurchases } from "../../src/api-handlers/getSavingsPurchases";
import { getSavingsRedemptions } from "../../src/api-handlers/getSavingsRedemptions";
import { getSavingsRewards } from "../../src/api-handlers/getSavingsRewards";
import { getStakePurchases } from "../../src/api-handlers/getStakePurchases";
import { getStakeRedemptions } from "../../src/api-handlers/getStakeRedemptions";
import { getStakeRewards } from "../../src/api-handlers/getStakeRewards";
import { getTrades } from "../../src/api-handlers/getTrades";
import { savePrices } from "../../src/api-handlers/savePrices";
import { BinanceTransaction } from "../../src/types/BinanceTransaction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BinanceTransaction[]>
) {
  const prisma = new PrismaClient();

  const config = await prisma.binanceConfig.findFirst();

  if (!config) {
    return res.status(500).json([]);
  }

  const { csrftoken, pt20 } = config;

  const lastTxn = (await prisma.binanceTransaction.findMany()).sort(
    (a, b) => b.createTime - a.createTime
  )[0];

  let maxDate = new Date("2021-05-01");

  if (lastTxn) {
    maxDate = new Date(lastTxn.createTime);
  }

  await prisma.binanceTransaction.deleteMany({ where: { type: "MANUAL" } });
  await savePrices();

  try {
    const transactions = uniqBy(
      [
        ...(await getStakeRewards({
          maxDate,
          csrftoken,
          pt20,
        })),
        ...(await getSavingsRedemptions({
          maxDate,
          csrftoken,
          pt20,
        })),
        ...(await getP2PTransactions({ maxDate, csrftoken, pt20 })),
        ...(await getDirectBuyTransactions({ maxDate, csrftoken, pt20 })),
        ...(await getStakePurchases({
          maxDate,
          csrftoken,
          pt20,
        })),
        ...(await getStakeRedemptions({
          maxDate,
          csrftoken,
          pt20,
        })),
        ...(await getSavingsPurchases({ maxDate, csrftoken, pt20 })),
        ...(await getSavingsRewards({ maxDate, csrftoken, pt20 })),
        ...(await getEth2Rewards({ maxDate, csrftoken, pt20 })),
        ...(await getTrades({ maxDate, csrftoken, pt20 })),
        ...(await getConverts({ maxDate, csrftoken, pt20 })),
        ...getManualTransactions(),
      ],
      (txn) => txn.orderNo
    ).map((txn) => ({ ...txn, createTime: +txn.createTime }));
    for (const txn of transactions) {
      try {
        await prisma.binanceTransaction.create({ data: txn });
      } catch (err) {
        // console.log(err);
      }
    }
    const _transactions = await prisma.binanceTransaction.findMany({
      orderBy: {
        createTime: "desc",
      },
    });
    res.status(200).json(_transactions as BinanceTransaction[]);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  } finally {
    prisma.$disconnect();
  }
}
