import { createAppKit } from "@reown/appkit-wagmi-react-native";
import { projectId, metadata, wagmiConfig } from "./wagmi";
import { intuitionTestnet } from "@0xintuition/protocol";

export const createWeb3AppKit = () => {
  return createAppKit({
    projectId,
    metadata,
    wagmiConfig,
    defaultChain: intuitionTestnet,
    enableAnalytics: true,
    features: {
      email: true,
      emailShowWallets: false,
      swaps: true,
      onramp: true,
      socials: ['x', 'apple', 'discord'],
    }
  });
};