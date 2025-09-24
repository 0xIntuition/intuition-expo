
export function getCachedImage(url?: string | null) {
  if (url === null) {
    return undefined
  }
  if (url?.includes('ipfs://')) {
    return url?.replace('ipfs://', 'https://intuition-expo.mypinata.cloud/ipfs/') + '?pinataGatewayToken=' + process.env.EXPO_PUBLIC_PINATA_GATEWAY_TOKEN;
  }
  return url;
}

export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

