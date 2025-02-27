import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { getAccountInfo } from "./account-info";
import { searchAtoms } from "./atom-search";
import { searchTaggedAtoms } from "./search-tagged-atoms";
export async function getTools(client: ApolloClient<object>) {
  const accountInfoFn = await getAccountInfo(client);
  const searchAtomsFn = await searchAtoms(client);
  const searchTaggedAtomsFn = await searchTaggedAtoms(client);
  return [
    zodFunction({
      function: (args: { account_id: string }) => accountInfoFn(args.account_id),
      name: "getAccountInfo",
      description: "Get account info, such as label, their preferences, their favorites, and their opinions on different subjects.",
      parameters: z.object({
        account_id: z.string().describe("Account ID (ethereum address), example: 0x61d0ef4be9e8a14793001ad33258383dd48618d8"),
      })
    }),
    zodFunction({
      function: (args: { likeStr: string }) => searchAtomsFn(args.likeStr),
      name: "searchAtoms",
      description: "Search for accounts, things, people, and concepts by name, description, URL or ens domain (e.g. john.eth).",
      parameters: z.object({ likeStr: z.string() }),
    }),
    zodFunction({
      function: (args: { atomIds: string[] }) => searchTaggedAtomsFn(args.atomIds),
      name: "searchTaggedAtoms",
      description: "Serch for accounts, things, people, and concepts that are tagged with the given atom IDs. For example to get a list of eth denver side events, you must use the id of ETHDenver 2025 Side Events. You can provide multiple atom ids to get a list of related accounts, things, people, and concepts.",
      parameters: z.object({ atomIds: z.array(z.string()) }),
    }),
  ];
}