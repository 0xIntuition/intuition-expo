import numbro from 'numbro';
export function getTripleLabel(triple: any) {
  return `${triple?.subject?.label} ${triple?.predicate?.label} ${triple?.object?.label}`;
}
export const numberFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
});

export function formatNumber(number: number) {
  return numbro(number).format({
    average: true,
    mantissa: 1,
    trimMantissa: true
  });
}

export function getCachedImage(cached_image: any) {
  return cached_image?.url?.replace('ipfs://', 'https://intuition-expo.mypinata.cloud/ipfs/') + '?pinataGatewayToken=' + process.env.EXPO_PUBLIC_PINATA_GATEWAY_TOKEN;
}