-- CreateTable
CREATE TABLE "BinanceTransaction" (
    "orderNo" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "buyAsset" TEXT NOT NULL,
    "buyAmount" TEXT NOT NULL,
    "buyFee" TEXT NOT NULL,
    "buyFeeAsset" TEXT NOT NULL,
    "buyIsFiat" BOOLEAN NOT NULL,
    "price" TEXT NOT NULL,
    "sellAsset" TEXT NOT NULL,
    "sellAmount" TEXT NOT NULL,
    "sellFee" TEXT NOT NULL,
    "sellFeeAsset" TEXT NOT NULL,
    "sellIsFiat" BOOLEAN NOT NULL,
    "notes" TEXT NOT NULL,
    "createTime" INTEGER NOT NULL
);
