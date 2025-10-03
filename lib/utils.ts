
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

