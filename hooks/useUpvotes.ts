//https://github.com/0xIntuition/intuition-ts/blob/8e523d0124d7428532c24694246328fdc1416a1c/apps/launchpad/app/routes/_app%2B/quests%2B/questions%2B/%24epochId%2B/%24questionId.tsx#L432

import { useGeneralConfig } from "./useGeneralConfig";

export const getUpvotes = (shares: bigint, price: bigint) => {
  const decimalPrecision = useGeneralConfig().decimalPrecision;
  const upvotePrice = getUpvotePrice();
  const upvotes = shares * price / BigInt(decimalPrecision) / upvotePrice;
  //console.log({ shares, price, upvotePrice, upvotes });
  console.log(`
${shares} - shares
${price} - price
${upvotePrice} - upvotePrice
${upvotes} - upvotes
    `)
  return upvotes;
};

export const getUpvotePrice = () => {
  const generalConfig = useGeneralConfig();
  const minDeposit = BigInt(generalConfig.minDeposit);
  const entryFee = BigInt(generalConfig.entry_fee);
  const feeDenominator = BigInt(generalConfig.feeDenominator);
  const upvotePrice = minDeposit - (minDeposit * entryFee) / feeDenominator;
  // console.log({ minDeposit, entryFee, feeDenominator, upvotePrice });
  return upvotePrice;
};
