import axios from "axios";
import { addDays, isAfter } from "date-fns";
import { BinanceTransaction } from "../types/BinanceTransaction";

export const getSavingsPurchases = async ({
  maxDate,
  csrftoken,
  pt20,
}: {
  maxDate: Date;
  csrftoken: string;
  pt20: string;
}) => {
  console.log("Savings purchases: started");
  const transactions: BinanceTransaction[] = [];
  let currentDate = new Date();
  let subtotal = 0;
  let page = 1;

  while (isAfter(currentDate, maxDate)) {
    const res = await axios.get(
      `https://www.binance.com/bapi/earn/v1/private/lending/union/purchaseRecord/list`,
      {
        params: {
          pageIndex: page,
          pageSize: 20,
          startTime: addDays(currentDate, -30).getTime(),
          endTime: currentDate.getTime(),
          lendingType: "DAILY",
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
        type: "SAVINGS_PURCHASE",
        orderNo: txn.id,
        buyAsset: "",
        buyAmount: "0",
        buyFee: "0",
        buyFeeAsset: "",
        buyIsFiat: false,
        price: "0",
        sellAsset: txn.asset,
        sellAmount: txn.amount,
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
  console.log("Savings purchases: done");
  return transactions;
};
