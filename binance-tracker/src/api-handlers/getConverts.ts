import axios from "axios";
import { addDays, isAfter } from "date-fns";
import { uniqBy } from "lodash";
import { BinanceTransaction } from "../types/BinanceTransaction";

export const getConverts = async ({
  maxDate,
  csrftoken,
  pt20,
}: {
  maxDate: Date;
  csrftoken: string;
  pt20: string;
}) => {
  console.log("Conversions: started");
  const transactions: BinanceTransaction[] = [];
  let currentDate = new Date();
  let subtotal = 0;
  let page = 1;

  while (isAfter(currentDate, maxDate)) {
    const res = await axios.get(
      `https://www.binance.com/bapi/margin/v1/private/new-otc/query-trade-history`,
      {
        params: {
          page,
          rows: 20,
          startTime: addDays(currentDate, -30).getTime(),
          endTime: currentDate.getTime(),
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
          csrftoken,
          Cookie: `logined=y; p20t=${pt20};`,
          clienttype: "web",
        },
      },
    );

    for (const txn of res.data.data) {
      transactions.push({
        type: "CONVERT",
        orderNo: txn.orderId,
        buyAsset: txn.toCoin,
        buyAmount: txn.toCoinAmount,
        buyFee: "0",
        buyFeeAsset: "",
        buyIsFiat: false,
        price: txn.quotePrice,
        sellAsset: txn.fromCoin,
        sellAmount: txn.fromCoinAmount,
        sellFee: "0",
        sellFeeAsset: "",
        sellIsFiat: false,
        createTime: txn.createTimestamp,
        notes: "",
      });
    }

    subtotal += res.data.data.length;
    if (res.data.total !== subtotal) {
      page++;
    } else {
      subtotal = 0;
      page = 1;
      currentDate = addDays(currentDate, -30);
    }
  }
  console.log("Conversion: done");
  return uniqBy(transactions, (txn) => txn.orderNo);
};
