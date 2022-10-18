import axios from "axios";
import classnames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { BinanceTransaction } from "../types/BinanceTransaction";
import { BinanceOrder } from "../types/BinanceOrder";
import { getAssetLogo } from "../utils/getAssetLogo";
import Head from "next/head";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format, startOfDay } from "date-fns";
import classNames from "classnames";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

type BinancePriceMap = {
  [time: number]: {
    [asset: string]: string;
  };
};

const convertableAssets = ["ETH", "BTC", "ADA", "SOL", "BNB"];
const actualAssets = ["SOL", "BTC", "ETH", "ADA"];
const stableCoins = ["USDC", "BUSD", "USDT"];

export const ignore = ["20292097429742006272", "20292098493843316736"];

export const AssetPerfomance = ({
  transactions,
  blur,
}: {
  transactions: BinanceTransaction[];
  blur: boolean;
}) => {
  const [usdToPhp, setUsdToPhp] = useState(0);
  const [orders, setOrders] = useState<BinanceOrder[]>([]);
  const prevRatesRef = useRef<{ price: string; symbol: string }[]>([]);

  const [rates, setRates] = useState<{ price: string; symbol: string }[]>([]);
  const messagesRef = useRef<any>([]);

  const [prices, setPrices] = useState<BinancePriceMap>({});

  const times = useMemo(() => {
    return Object.keys(prices)
      .sort((a, b) => +a - +b)
      .map((time) => +time);
  }, [prices]);

  useEffect(() => {
    axios.get<BinancePriceMap>("/api/price").then((res) => setPrices(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/orders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        //
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://free.currconv.com/api/v7/convert`, {
        params: {
          q: "USD_PHP",
          apiKey: "a3465ae6289d457aba4c",
          compact: "ultra",
        },
      })
      .then((res) => {
        setUsdToPhp(res.data.USD_PHP);
      })
      .catch((err) => {
        setUsdToPhp(51);
      });
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     if (messagesRef.current.length > 0) {
  //       const messages = [...messagesRef.current];
  //       setRates((rates) => {
  //         prevRatesRef.current = [...rates];
  //         return rates.map((rate) => {
  //           for (const data of messages) {
  //             if (rate.symbol === data.s) {
  //               return { ...rate, price: data.c };
  //             }
  //           }
  //           return rate;
  //         });
  //       });
  //       messagesRef.current = [];
  //     }
  //   }, 1000);
  // }, []);

  // useEffect(() => {
  //   const socket = new WebSocket("wss://stream.binance.com:9443/stream");

  //   socket.onopen = () => {
  //     socket.send(
  //       JSON.stringify({
  //         method: "SUBSCRIBE",
  //         params: [
  //           ...convertableAssets.map((asset) => `${asset.toLowerCase()}usdt`),
  //           "betheth",
  //         ].map((symbol) => symbol + "@ticker"),
  //         id: 1,
  //       })
  //     );
  //   };
  //   socket.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data);
  //     if (eventData.stream) {
  //       const data = eventData.data;
  //       messagesRef.current.push(data);
  //     }
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  useEffect(() => {
    const fetchRates = () => {
      Promise.all(
        [...convertableAssets.map((asset) => `${asset}USDT`), "BETHETH"].map(
          (asset) =>
            axios.get<{ price: string; symbol: string }>(
              `https://api.binance.com/api/v3/ticker/price?symbol=${asset}`,
            ),
        ),
      ).then((responses) => {
        setRates(responses.map((res) => res.data));
      });
    };

    fetchRates();
  }, []);

  const setCurrentPriceRef = useRef(false);

  useEffect(() => {
    if (
      rates.length > 0 &&
      Object.keys(prices).length > 0 &&
      !setCurrentPriceRef.current
    ) {
      setPrices((prices) => ({
        ...prices,
        [startOfDay(new Date()).getTime()]: {
          ADA: String(rates.find((rate) => rate.symbol === "ADAUSDT")?.price),
          BETH: String(rates.find((rate) => rate.symbol === "BETHETH")?.price),
          BTC: String(rates.find((rate) => rate.symbol === "BTCUSDT")?.price),
          ETH: String(rates.find((rate) => rate.symbol === "ETHUSDT")?.price),
          SOL: String(rates.find((rate) => rate.symbol === "SOLUSDT")?.price),
        },
      }));
      setCurrentPriceRef.current = true;
    }
  }, [rates, prices]);

  const {
    freeAssets,
    lockedAssets,
    allAssets,
    avgPriceReal,
    totalDepositPerAsset,
    timeMap,
  } = useMemo(() => {
    const freeAssets: { [asset: string]: number } = {};
    const lockedAssets: { [asset: string]: number } = {};
    const totalDepositPerAsset: { [asset: string]: number } = {};
    const avgPrice: {
      [asset: string]: { amount: number; priceUSD: number }[];
    } = {};
    const timeMap: { [asset: string]: { [time: number]: number } } = {
      PHP: {},
      BTC: {},
      SOL: {},
      ADA: {},
      ETH: {},
      USDT: {},
      BETH: {},
    };

    function delta(obj: any, key: string, change: number) {
      if (!key) return;
      if (!obj[key]) obj[key] = 0;
      obj[key] += change;
    }
    function deltaPush(
      obj: any,
      key: string,
      change: { amount: number; priceUSD: number },
    ) {
      if (!key) return;
      if (!obj[key]) obj[key] = [];
      obj[key].push(change);
    }

    function convertTime(timestamp: number) {
      return startOfDay(new Date(timestamp)).getTime() + 8 * 60 * 60 * 1000;
    }

    function deltaTimeline(asset: string, amount: number, timestamp: number) {
      const time = convertTime(timestamp);

      if (timeMap[asset][time]) {
        timeMap[asset][time] += amount;
      } else {
        timeMap[asset][time] = amount;
      }
    }

    for (const order of orders) {
      delta(lockedAssets, order.sellAsset, +order.sellAmount);
      delta(freeAssets, order.sellAsset, -+order.sellAmount);
    }

    for (const txn of transactions) {
      if (ignore.includes(txn.orderNo)) {
        continue;
      }

      if (["SAVINGS_PURCHASE", "STAKE_PURCHASE"].includes(txn.type)) {
        delta(lockedAssets, txn.sellAsset, +txn.sellAmount);
      }

      if (["STAKE_REDEMPTION", "SAVINGS_REDEMPTION"].includes(txn.type)) {
        delta(lockedAssets, txn.buyAsset, -+txn.buyAmount);
      }

      delta(freeAssets, txn.buyAsset, +txn.buyAmount);
      delta(freeAssets, txn.sellAsset, -+txn.sellAmount);

      if (
        [
          "DIRECT",
          "STAKE_REWARD",
          "P2P",
          "SAVINGS_REWARD",
          "MANUAL",
          "TRADE",
        ].includes(txn.type)
      ) {
        if (txn.buyAsset in timeMap && txn.buyAsset !== "PHP") {
          deltaTimeline(txn.buyAsset, +txn.buyAmount, txn.createTime);
        }
        if (txn.sellAsset in timeMap && txn.sellAsset !== "PHP") {
          deltaTimeline(txn.sellAsset, -+txn.sellAmount, txn.createTime);
        }
      }

      if (txn.sellAsset === "PHP") {
        deltaTimeline("PHP", +txn.sellAmount, txn.createTime);
      }

      if (txn.buyAsset === "PHP") {
        deltaTimeline("PHP", -+txn.buyAmount, txn.createTime);
      }

      if (["DIRECT", "P2P"].includes(txn.type)) {
        delta(totalDepositPerAsset, txn.buyAsset, +txn.sellAmount);

        deltaPush(avgPrice, txn.buyAsset, {
          amount: +txn.buyAmount,
          priceUSD: +txn.price / usdToPhp,
        });
      }

      if (txn.type === "TRADE") {
        if (stableCoins.includes(txn.sellAsset)) {
          delta(totalDepositPerAsset, txn.buyAsset, +txn.sellAmount * usdToPhp);
          deltaPush(avgPrice, txn.buyAsset, {
            amount: +txn.buyAmount,
            priceUSD: +txn.price,
          });
          delta(
            totalDepositPerAsset,
            txn.sellAsset,
            -(+txn.sellAmount * usdToPhp),
          );
        }
      }

      if (txn.type === "MANUAL") {
        if (txn.buyAsset === "PHP") {
          delta(totalDepositPerAsset, txn.sellAsset, -+txn.buyAmount);
        }
        if (txn.sellAsset === "PHP") {
          delta(totalDepositPerAsset, txn.buyAsset, +txn.sellAmount);
          deltaPush(avgPrice, txn.buyAsset, {
            amount: +txn.buyAmount,
            priceUSD: +txn.price,
          });
        }

        if (txn.sellFee !== "0") {
          delta(freeAssets, txn.sellFeeAsset, -+txn.sellFee);
        }
        if (txn.buyFee !== "0") {
          delta(freeAssets, txn.buyFeeAsset, -+txn.buyFee);
        }
      }
    }

    for (const asset of [...stableCoins, "BNB"]) {
      delete totalDepositPerAsset[asset];
      delete avgPrice[asset];
    }

    const avgPriceReal: { [asset: string]: number } = {};

    for (let asset in avgPrice) {
      let totalweight = 0;
      let weightedAvg = 0;
      for (const input of avgPrice[asset]) {
        weightedAvg += input.priceUSD * +input.amount;
        totalweight += +input.amount;
      }
      weightedAvg = weightedAvg / totalweight;
      avgPriceReal[asset] = weightedAvg;
    }

    const allAssets: { [asset: string]: number } = {};
    for (const asset in freeAssets) {
      allAssets[asset] = freeAssets[asset] + (lockedAssets[asset] || 0);
    }

    return {
      freeAssets,
      lockedAssets,
      allAssets,
      avgPriceReal,
      totalDepositPerAsset,
      timeMap,
    };
  }, [orders, transactions, usdToPhp]);

  let assetsInUSD = 0;

  function convertToUSD(asset: string, value: number) {
    if (convertableAssets.includes(asset)) {
      const rate = +(
        rates.find((rate) => rate.symbol.startsWith(asset))?.price || 0
      );
      return rate * value;
    } else if (stableCoins.includes(asset)) return value;
    else if (asset === "BETH") {
      const bethRate = +(
        rates.find((rate) => rate.symbol.startsWith("BETH"))?.price || 0
      );
      const ethRate = +(
        rates.find((rate) => rate.symbol.startsWith("ETH"))?.price || 0
      );
      return bethRate * value * ethRate;
    }
    return 0;
  }
  for (const asset in allAssets) {
    if (asset === "PHP") continue;
    assetsInUSD += convertToUSD(asset, allAssets[asset]);
  }

  const usdFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    [],
  );

  const phpFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }),
    [],
  );

  const assetTable = [];

  for (const asset in freeAssets) {
    if (["PHP", "FTM", "BNB"].includes(asset)) continue;

    const free = +freeAssets[asset];
    const locked = +(lockedAssets[asset] || 0);
    const total = free + locked;
    if (total === 0) continue;
    const inUSD = convertToUSD(asset, allAssets[asset]);
    const value =
      asset === "BETH"
        ? 0
        : (asset === "ETH"
            ? convertToUSD("ETH", allAssets.BETH || 0) + inUSD
            : inUSD) * usdToPhp;

    const diff = value - (totalDepositPerAsset[asset] || 0);
    if (total === 0) continue;

    const previousPrice = +(
      prevRatesRef.current.find((rate) => rate.symbol.startsWith(asset))
        ?.price || 0
    );
    const currentPrice = +(
      rates.find((rate) => rate.symbol.startsWith(asset))?.price || 0
    );

    assetTable.push({
      asset,
      free: free.toFixed(4),
      locked: (+locked).toFixed(4),
      total: total.toFixed(4),
      currentPrice: usdFormatter.format(currentPrice),
      didPriceGoUp: previousPrice < currentPrice,
      avgPrice: usdFormatter.format(avgPriceReal[asset] || 0),
      deposited: totalDepositPerAsset[asset]
        ? phpFormatter.format(totalDepositPerAsset[asset])
        : "",
      "deposited%": "0%",
      currValue: phpFormatter.format(value),
      "currValue%": "0%",
      "P/L": phpFormatter.format(totalDepositPerAsset[asset] ? diff : 0),
      "P/L%": !totalDepositPerAsset[asset]
        ? "0%"
        : ((diff / totalDepositPerAsset[asset]) * 100).toFixed(2) + "%",
    });
  }

  assetTable.sort((a, b) => {
    const aDeposited = +a.deposited.replace("₱", "").replace(",", "");
    const bDeposited = +b.deposited.replace("₱", "").replace(",", "");
    return bDeposited - aDeposited;
  });

  let totalDeposit = 0;
  let totalCurr = 0;
  for (const asset in assetTable) {
    if ([...stableCoins, "BETH"].includes(asset) || !(asset in assetTable))
      continue;
    const deposit = +assetTable[asset]["deposited"].slice(1).replace(",", "");
    const curr = +assetTable[asset].currValue.slice(1).replace(",", "");

    totalDeposit += deposit;
    totalCurr += curr;
  }
  for (const asset in assetTable) {
    if ([...stableCoins, "BETH"].includes(asset)) continue;
    const deposit = +assetTable[asset]["deposited"].slice(1).replace(",", "");
    const curr = +assetTable[asset].currValue.slice(1).replace(",", "");
    assetTable[asset]["deposited%"] =
      ((deposit / totalDeposit) * 100).toFixed(2) + "%";
    assetTable[asset]["currValue%"] =
      ((curr / totalCurr) * 100).toFixed(2) + "%";
  }

  const totalDepositedUSD = -freeAssets.PHP / usdToPhp;
  const totalDepositedPHP = -freeAssets.PHP;

  const assetsInPHP = assetsInUSD * usdToPhp;

  const diffUSD = assetsInUSD - totalDepositedUSD;
  const diffPHP = assetsInPHP - totalDepositedPHP;

  const sumTable = {
    "Total Deposited": {
      USD: usdFormatter.format(totalDepositedUSD),
      PHP: phpFormatter.format(totalDepositedPHP),
    },
    "Current Value": {
      USD: usdFormatter.format(assetsInUSD),
      PHP: phpFormatter.format(assetsInPHP),
    },
    "P/L": {
      USD: usdFormatter.format(diffUSD),
      PHP: phpFormatter.format(diffPHP),
    },
  };

  const totalDepositTimeline = useMemo(() => {
    let latestSell = 0;
    const totalDepositTimeline: (number | null)[] = [];
    for (const time of times) {
      if (timeMap.PHP[time]) {
        totalDepositTimeline.push(latestSell + timeMap.PHP[time]);
        latestSell += timeMap.PHP[time];
      } else {
        if (totalDepositTimeline.length === 0) {
          totalDepositTimeline.push(0);
        } else {
          totalDepositTimeline.push(null);
        }
      }
    }
    const len = totalDepositTimeline.length;
    if (totalDepositTimeline[len - 1] === null) {
      const lastDeposit = [...totalDepositTimeline]
        .reverse()
        .find((deposit) => deposit !== null);
      if (lastDeposit) {
        totalDepositTimeline[len - 1] = lastDeposit;
      }
    }
    return totalDepositTimeline;
  }, [timeMap.PHP, times]);

  const totalCryptoValue = useMemo(() => {
    const totalCryptoValue: number[] = [];
    const symbols = ["BTC", "ADA", "SOL", "ETH", "USDT", "BETH"];
    const totalCryptoSoFar = {
      BTC: 0,
      ADA: 0,
      SOL: 0,
      ETH: 0,
      USDT: 0,
      BETH: 0,
    };
    const currTime = startOfDay(new Date()).getTime() + 8 * 60 * 60 * 1000;
    for (const time of times) {
      if (time === currTime) {
        totalCryptoValue.push(assetsInPHP);
        continue;
      }
      let value = 0;
      for (const asset of symbols) {
        if (timeMap[asset][time]) {
          totalCryptoSoFar[asset as keyof typeof totalCryptoSoFar] +=
            timeMap[asset][time];
        }

        const assetPrice =
          asset === "USDT"
            ? 1
            : +prices[time][asset === "BETH" ? "ETH" : asset];
        const bethPrice = +prices[time].BETH;

        const price = asset === "BETH" ? bethPrice * assetPrice : assetPrice;
        value +=
          price *
          totalCryptoSoFar[asset as keyof typeof totalCryptoSoFar] *
          usdToPhp;
      }
      totalCryptoValue.push(value);
    }
    return totalCryptoValue;
  }, [prices, timeMap, times, usdToPhp, assetsInPHP]);

  const data = useMemo(() => {
    return {
      labels: times.map((time) => format(new Date(time), "MMM dd")).slice(200),
      datasets: [
        {
          label: "Total deposit",
          data: totalDepositTimeline.slice(200),
          borderColor: "#4ade80",
          backgroundColor: "#4ade80",
          spanGaps: true,
          stepped: true,
        },
        {
          label: "Value",
          data: totalCryptoValue.slice(200),
          borderColor: "#facc15",
          backgroundColor: "#facc15",
        },
      ],
    };
  }, [times, totalCryptoValue, totalDepositTimeline]);

  const rewards = useMemo(() => {
    const rewards: { [key: string]: number } = {};

    for (const txn of transactions) {
      if (txn.type === "STAKE_REWARD" || txn.type === "SAVINGS_REWARD") {
        if (!rewards[txn.buyAsset]) {
          rewards[txn.buyAsset] = 0;
        }
        rewards[txn.buyAsset] += +txn.buyAmount;
      }
    }

    return rewards;
  }, [transactions]);

  const rewardsPrice = useMemo(() => {
    let rewardsPrice = 0;
    for (const asset in rewards) {
      const rate = rates.find((rate) => rate.symbol.startsWith(asset));
      if (asset === "BETH") {
        const ethRate = rates.find((rate) => rate.symbol === "ETHUSDT");

        rewardsPrice += +rewards[asset] * +(ethRate?.price || 0);
      } else {
        rewardsPrice += +rewards[asset] * +(rate?.price || 0);
      }
    }
    return phpFormatter.format(rewardsPrice * usdToPhp);
  }, [rates, rewards, phpFormatter, usdToPhp]);

  return (
    <>
      <Head>
        <title>
          {assetTable
            .find((asset) => asset.asset === "SOL")
            ?.currentPrice.slice(1)}{" "}
          /{" "}
          {assetTable
            .find((asset) => asset.asset === "ETH")
            ?.currentPrice.slice(1)}{" "}
          /{" "}
          {assetTable
            .find((asset) => asset.asset === "BTC")
            ?.currentPrice.slice(1)}
        </title>
      </Head>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="px-4 py-5 bg-gray-900 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-white truncate">
              Total deposited
            </dt>
            <dd
              className={classNames("mt-1 text-3xl font-semibold text-white")}
            >
              {blur ? "******" : sumTable["Total Deposited"].PHP}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-900 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-white truncate">
              Current Value
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-white">
              {blur ? "******" : sumTable["Current Value"].PHP}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-900 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-white truncate">
              Total rewards
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-white">
              {blur ? "******" : rewardsPrice}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-900 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-white truncate">Returns</dt>
            <dd
              className={classnames("mt-1 text-3xl font-semibold", {
                "text-red-500": sumTable["P/L"].PHP[0] === "-",
                "text-green-500":
                  sumTable["P/L"].PHP[0] !== "-" &&
                  sumTable["P/L"].PHP !== "₱0.00",
              })}
            >
              {blur ? "******" : sumTable["P/L"].PHP} (
              {`${((diffUSD / totalDepositedUSD) * 100).toFixed(2) + "%"}`})
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-col mt-5">
        <h6 className="text-lg mb-5 text-white font-semibold">
          Asset Performance
        </h6>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-600 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Asset
                    </th>
                    {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    Free
                  </th>  */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Free
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Current price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Avg. Price Bought
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      P/L
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      P/L %
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Deposited
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Deposited %
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Current value
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      Current value %
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-gray-900 text-gray-200 divide-y divide-gray-600">
                  {assetTable.map((item) => {
                    const assetOrders = orders.filter(
                      (order) => order.buyAsset === item.asset,
                    );
                    return (
                      <tr key={item.asset}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            className="flex items-center space-x-2 hover:underline"
                            rel="noreferrer"
                            target="_blank"
                            href={`https://www.binance.com/en/trade/${item.asset}_USDT?layout=pro`}
                          >
                            <div
                              className="flex items-center"
                              style={{ minWidth: 24 }}
                            >
                              {getAssetLogo(item.asset)}
                            </div>
                            <div>{item.asset}</div>
                          </a>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right">
                      {item.free}
                    </td>*/}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {blur ? "******" : item.free}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {blur ? "******" : item.total}
                        </td>
                        <td
                          className={classnames(
                            "px-6 py-4 whitespace-nowrap text-right transition-all delay-500",
                            actualAssets.includes(item.asset) && {
                              "to-green": item.didPriceGoUp,
                              "to-red": !item.didPriceGoUp,
                            },
                          )}
                        >
                          {item.currentPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {["SOL", "BTC", "ETH"].includes(item.asset) &&
                            assetOrders
                              .sort((a, b) => +b.price - +a.price)
                              .map((order, index) => (
                                <div key={index}>
                                  {usdFormatter.format(+(order?.price || 0))} (
                                  {usdFormatter.format(+order.sellAmount)})
                                </div>
                              ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {item.avgPrice}
                        </td>
                        <td
                          className={classnames(
                            "px-6 py-4 whitespace-nowrap text-right",
                            {
                              "text-red-500": item["P/L"][0] === "-",
                              "text-green-500":
                                item["P/L"][0] !== "-" &&
                                item["P/L"] !== "₱0.00",
                            },
                          )}
                        >
                          {blur ? "******" : item["P/L"]}
                        </td>
                        <td
                          className={classnames(
                            "px-6 py-4 whitespace-nowrap text-right",
                            {
                              "text-red-500": item["P/L"][0] === "-",
                              "text-green-500":
                                item["P/L"][0] !== "-" &&
                                item["P/L"] !== "₱0.00",
                            },
                          )}
                        >
                          {item["P/L%"]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {blur ? "******" : item["deposited"]}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right">
                          {item["deposited%"]}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {blur ? "******" : item.currValue}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right">
                          {item["currValue%"]}
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Line
        options={{
          ...options,
          scales: {
            yAxis: {
              ticks: {
                display: !blur,
              },
            },
          },
        }}
        data={data}
      />
    </>
  );
};
