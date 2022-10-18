import { Spot } from "@binance/connector";
import { PrismaClient } from "@prisma/client";
import {
  addDays,
  addMonths,
  endOfMonth,
  isBefore,
  startOfMonth,
} from "date-fns";

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;
const baseUrl = process.env.BINANCE_API_URL;

export const savePrices = async () => {
  const prisma = new PrismaClient();
  const client = new Spot(apiKey, apiSecret, {
    baseURL: baseUrl,
  });
  console.log("Saving prices: started");

  const prices = await prisma.binancePrice.findMany({
    orderBy: {
      time: "desc",
    },
  });
  const latestPriceTime = prices[0]?.time;

  const symbols = ["BTC", "ETH", "SOL", "ADA", "BETH"];

  for (const symbol of symbols) {
    console.log(symbol);
    const minDate = addDays(new Date(), -1);
    let currDate = latestPriceTime
      ? new Date(latestPriceTime)
      : new Date("2021-05-01");
    while (isBefore(currDate, minDate)) {
      const res = await client.klines(
        symbol === "BETH" ? "BETHETH" : symbol + "USDT",
        "1d",
        {
          startTime: startOfMonth(currDate).getTime(),
          endTime: endOfMonth(currDate).getTime(),
          limit: 40,
        }
      );
      for (const kline of res.data) {
        try {
          await prisma.binancePrice.create({
            data: {
              time: kline[0] as number,
              symbol,
              price: kline[1] as string,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
      currDate = addMonths(currDate, 1);
    }
  }

  console.log("Saving prices: done");
};
