import axios from "axios";
import { addDays, isAfter } from "date-fns";
import { uniqBy } from "lodash";
import { BinanceTransaction } from "../types/BinanceTransaction";

export const getP2PTransactions = async ({
  maxDate,
  csrftoken,
  pt20,
}: {
  maxDate: Date;
  csrftoken: string;
  pt20: string;
}) => {
  console.log("P2P Transactions: started");
  const transactions: BinanceTransaction[] = [];
  let currentDate = new Date();
  let subtotal = 0;
  let page = 1;
  while (isAfter(currentDate, maxDate)) {
    const res = await axios.post(
      `https://c2c.binance.com/bapi/c2c/v1/private/c2c/order-match/order-list-archived-involved`,
      {
        page,
        rows: 20,
        startDate: addDays(currentDate, -30).getTime(),
        endDate: currentDate.getTime(),
        orderStatusList: null,
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

    for (const txn of res.data.data) {
      console.log(txn);
      if (txn.orderStatus === 4) {
        transactions.push({
          type: "P2P",
          orderNo: txn.orderNumber,
          buyAsset: txn.asset,
          buyAmount: txn.amount,
          buyFee: "0",
          buyFeeAsset: "",
          buyIsFiat: false,
          price: txn.price,
          sellAsset: txn.fiat,
          sellAmount: txn.totalPrice,
          sellFee: "0",
          sellFeeAsset: "",
          sellIsFiat: true,
          createTime: txn.createTime,
          notes: txn.sellerNickname,
        });
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
  console.log("P2P Transactions: done");
  return uniqBy(transactions, (txn) => txn.orderNo);
};
