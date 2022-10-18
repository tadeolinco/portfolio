import { BinanceTransaction } from "./BinanceTransaction";

export type BinanceOrder = Pick<
  BinanceTransaction,
  "buyAsset" | "buyAmount" | "price" | "sellAmount" | "sellAsset"
>;
