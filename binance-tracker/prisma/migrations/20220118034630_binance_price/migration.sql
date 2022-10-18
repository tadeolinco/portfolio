-- CreateTable
CREATE TABLE "BinancePrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BinancePrice_time_symbol_key" ON "BinancePrice"("time", "symbol");
