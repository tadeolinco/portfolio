import axios from "axios";
import { addDays, isAfter } from "date-fns";
import { uniqBy } from "lodash";
import { BinanceTransaction } from "../types/BinanceTransaction";

export const getDirectBuyTransactions = async ({
  maxDate,
  csrftoken,
  pt20,
}: {
  maxDate: Date;
  csrftoken: string;
  pt20: string;
}) => {
  console.log("Direct buys: started");
  let transactions: BinanceTransaction[] = [];
  let currentDate = new Date();
  let subtotal = 0;
  let page = 1;
  while (isAfter(currentDate, maxDate)) {
    const res = await axios.post(
      `https://www.binance.com/bapi/fiat/v1/private/ocbs/get-user-payment-history`,
      {
        page,
        limit: 15,
        startTime: addDays(currentDate, -30).getTime(),
        endTime: currentDate.getTime(),
        type: "0",
      },
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
    if (res.data?.data?.rows?.dataList) {
      for (const txn of res.data.data.rows.dataList) {
        if (txn.statusName === "Successful") {
          transactions.push({
            type: "DIRECT",
            orderNo: txn.orderId,
            buyAsset: txn.cryptoCurrency,
            buyAmount: txn.obtainAmount,
            buyFee: "0",
            buyFeeAsset: "",
            buyIsFiat: false,
            price: txn.price,
            sellAsset: txn.fiatCurrency,
            sellAmount: txn.sourceAmount,
            sellFee: txn.totalFee,
            sellFeeAsset: txn.fiatCurrency,
            sellIsFiat: true,
            createTime: txn.createTimeStamp,
            notes: "",
          });
        }
      }
      subtotal += res.data.data.rows.dataList.length;
    }
    if (res.data.data.rows.count !== subtotal) {
      page++;
    } else {
      subtotal = 0;
      page = 1;
      currentDate = addDays(currentDate, -30);
    }
  }
  console.log("Direct buys: done");
  return uniqBy(transactions, (txn) => txn.orderNo);
};
