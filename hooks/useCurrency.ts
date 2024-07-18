import { formatEther } from 'viem'

export function useCurrency() {
  return 'USD';
}

export function convertToCurrency(amount: string) {
  const wei = BigInt(amount);
  const eth = formatEther(wei);
  // TODO: Replace this with a real exchange rate
  const usd = parseFloat(eth) * 3410;
  return usd.toFixed(2) + ' USD';
}
