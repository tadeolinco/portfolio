import Image from "next/image";
import { getAssetLogoUrl } from "./getAssetLogoUrl";

export const getAssetLogo = (asset: string) => {
  const url = getAssetLogoUrl(asset);
  if (url) return <Image src={url} alt={asset} width={24} height={24} />;
  return null;
};
