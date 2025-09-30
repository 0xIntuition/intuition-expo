import { createAppKit } from "@reown/appkit-wagmi-react-native";
import { projectId, metadata, wagmiConfig } from "./wagmi";
import { intuitionTestnet } from "@0xintuition/protocol";

export const createWeb3AppKit = () => {
  return createAppKit({
    projectId,
    metadata,
    wagmiConfig,
    defaultChain: intuitionTestnet,
    debug: true,
    chainImages: {
      13597: "https://avatars.githubusercontent.com/u/94311139?s=200&v=4",
    },
    enableAnalytics: true,
    features: {
      email: false,
      // emailShowWallets: false,
      swaps: true,
      onramp: true,
      // socials: ['x', 'apple', 'discord'],
    }
  });
};
