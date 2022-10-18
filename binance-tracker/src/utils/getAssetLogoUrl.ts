export const getAssetLogoUrl = (asset: string) => {
  const idMap: { [key: string]: number } = {
    BTC: 1,
    ETH: 1027,
    BETH: 8353,
    FTM: 3513,
    ADA: 2010,
    SOL: 5426,
    BUSD: 4687,
    BNB: 1839,
    USDT: 825,
  };

  if (idMap[asset])
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${idMap[asset]}.png`;
  if (asset === "PHP")
    return `https://s2.coinmarketcap.com/static/img/fait/200x200/PHP.png`;
  return null;
};
