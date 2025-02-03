import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { getAccountInfo } from "./account-info";

export async function getTools(client: ApolloClient<object>) {
  const accountInfoFn = await getAccountInfo(client);
  return [
    zodFunction({
      function: (args: { account_id: string }) => accountInfoFn(args.account_id),
      name: "getAccountInfo",
      description: "Get account info, such as label, their preferences, their favorites, and their opinions on different subjects.",
      parameters: z.object({
        account_id: z.string().describe("Account ID (ethereum address), example: 0x61d0ef4be9e8a14793001ad33258383dd48618d8"),
      })
    }),
  ];
}