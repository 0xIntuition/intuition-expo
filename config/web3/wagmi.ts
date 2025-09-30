import { defaultWagmiConfig } from "@reown/appkit-wagmi-react-native";
import { authConnector } from "@reown/appkit-auth-wagmi-react-native";
import { intuitionTestnet } from "@0xintuition/protocol";
import { mainnet } from "viem/chains";

export const projectId = "9894a080a383df0833d5e82404186fdd";

export const metadata = {
  name: "Intuiton",
  description: "Bringing human trust to trustless systems",
  url: "https://portal.intuition.systems",
  icons: ["https://avatars.githubusercontent.com/u/94311139?s=200&v=4"],
  redirect: {
    native: "intuition://",
    universal: "portal.intuition.systems",
  },
};

export const chains = [mainnet, intuitionTestnet] as const;

export const auth = authConnector({ projectId, metadata });

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // extraConnectors: [auth] // not available on intuitionTestnet yet
});
