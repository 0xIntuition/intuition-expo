import { formatEther } from 'viem';

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

export function shortLink(url?: string | null): string | undefined {
  if (!url?.trim()) {
    return undefined;
  }

  try {
    // Try to parse as proper URL
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // Remove trailing slash for consistent parsing
    const cleanPath = pathname.endsWith('/') ? pathname.slice(0, -1) :
      pathname;
    const pathParts = cleanPath.split('/').filter(Boolean);

    // If no path or short path, return just the hostname
    if (pathParts.length <= 1) {
      return urlObj.hostname;
    }

    // Return hostname/.../lastSegment
    return `${urlObj.hostname}/.../${pathParts[pathParts.length - 1]}`;
  } catch {
    // Fallback for non-URL strings (if you want to support them)
    const parts = url.split('/').filter(Boolean);
    if (parts.length <= 2) {
      return url;
    }
    return `${parts[0]}/.../${parts[parts.length - 1]}`;
  }
}

/**
 * Format TRUST token amounts for display
 * Converts from wei to ether and formats with commas
 * Examples: 2,328.33, 8.33, 7,823.29
 */
export function formatTrust(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined) return '0.00';

  try {
    // Convert string to bigint for formatEther
    const amountStr = typeof amount === 'number' ? amount.toString() : amount;

    // Handle decimal values - if it contains a decimal point, treat as already formatted
    if (amountStr.includes('.')) {
      const num = parseFloat(amountStr);
      if (isNaN(num)) return '0.00';
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Convert from wei to ether using viem's formatEther
    const etherValue = formatEther(BigInt(amountStr));
    const num = parseFloat(etherValue);

    if (isNaN(num)) return '0.00';

    // Format with commas and 2 decimal places
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } catch (error) {
    return '0.00';
  }
}

/**
 * Format large numbers with comma separators
 * Examples: 34,126 or 8,752
 */
export function formatNumber(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '0';
  const value = typeof num === 'string' ? parseInt(num, 10) : num;
  if (isNaN(value)) return '0';
  return value.toLocaleString('en-US');
}

/**
 * Shorten Ethereum addresses for display
 * Example: 0x7fd8...e4d0
 */
export function shortenAddress(address: string | null | undefined): string {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

