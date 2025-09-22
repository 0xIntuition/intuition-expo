import { defaultWagmiConfig } from "@reown/appkit-wagmi-react-native";
import { authConnector } from "@reown/appkit-auth-wagmi-react-native";
import { mainnet } from "@wagmi/core/chains";
import { intuitionTestnet } from "@0xintuition/protocol";

export const projectId = "9894a080a383df0833d5e82404186fdd";

export const metadata = {
  name: "Intuiton",
  description: "Bringing human trust to trustless systems",
  url: "https://portal.intuition.systems",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
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
  extraConnectors: [auth]
});