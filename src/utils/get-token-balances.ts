import { AlchemyWeb3 } from "@alch/alchemy-web3";

export const getTokenBalance = async (
  alchemyWeb3Obj: AlchemyWeb3,
  ownerAddress: string,
  tokenAddresses?: string[]
) => {
  const balances = await alchemyWeb3Obj.alchemy.getTokenBalances(
    ownerAddress,
    tokenAddresses
  );
  console.log({ balances });
  return balances;
};
