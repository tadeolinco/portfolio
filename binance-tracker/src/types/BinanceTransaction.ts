export type BinanceTransaction = {
  type:
    | "CONVERT"
    | "DIRECT"
    | "STAKE_PURCHASE"
    | "STAKE_REWARD"
    | "STAKE_REDEMPTION"
    | "P2P"
    | "SAVINGS_PURCHASE"
    | "SAVINGS_REWARD"
    | "SAVINGS_REDEMPTION"
    | "MANUAL"
    | "TRADE";
  orderNo: string;
  buyAsset: string;
  buyAmount: string;
  buyFee: string;
  buyFeeAsset: string;
  buyIsFiat: boolean;
  price: string;
  sellAsset: string;
  sellAmount: string;
  sellFee: string;
  sellFeeAsset: string;
  sellIsFiat: boolean;
  createTime: number;
  notes: string;
};
