import axios from "axios";
import { addDays, isAfter } from "date-fns";
import { BinanceTransaction } from "../types/BinanceTransaction";

export const getTrades = async ({
  maxDate,
  csrftoken,
  pt20,
}: {
  maxDate: Date;
  csrftoken: string;
  pt20: string;
}) => {
  console.log("Trades: started");
  const transactions: BinanceTransaction[] = [];
  let currentDate = new Date();
  let subtotal = 0;
  let page = 1;

  while (isAfter(currentDate, maxDate)) {
    const res = await axios.post(
      `https://www.binance.com/bapi/capital/v1/private/streamer/order/get-trade-orders`,
      {
        page,
        rows: 15,
        startTime: addDays(currentDate, -30).getTime(),
        endTime: currentDate.getTime(),
        hideCancel: true,
      },
      {
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
      if (txn.status === "Filled") {
        transactions.push(
          txn.side === "BUY"
            ? {
                type: "TRADE",
                orderNo: String(txn.orderId),
                buyAsset: txn.baseAsset,
                buyAmount: txn.executedQty,
                buyFee: "0",
                buyFeeAsset: "",
                buyIsFiat: false,
                price: txn.price,
                sellAsset: txn.quoteAsset,
                sellAmount: txn.executedQuoteQty,
                sellFee: "0",
                sellFeeAsset: "",
                sellIsFiat: false,
                createTime: txn.updateTime,
                notes: "",
              }
            : {
                type: "TRADE",
                orderNo: String(txn.orderId),
                buyAsset: txn.quoteAsset,
                buyAmount: txn.executedQuoteQty,
                buyFee: "0",
                buyFeeAsset: "",
                buyIsFiat: false,
                price: txn.price,
                sellAsset: txn.baseAsset,
                sellAmount: txn.executedQty,
                sellFee: "0",
                sellFeeAsset: "",
                sellIsFiat: false,
                createTime: txn.updateTime,
                notes: "",
              },
        );
      }
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
  console.log("Trades: done");
  return transactions;
};
