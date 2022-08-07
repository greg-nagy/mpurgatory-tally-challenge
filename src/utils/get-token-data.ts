import { Alchemy, TokenBalancesResponse } from "alchemy-sdk";

export const getTokenData = async (
  tokens: TokenBalancesResponse,
  alchemy: Alchemy
) => {
  const filteredTokens = tokens.tokenBalances.filter(
    (balance) => balance.tokenBalance !== "0"
  );
  const metaDataPromises = filteredTokens.map((token) =>
    alchemy.core.getTokenMetadata(token.contractAddress)
  );

  const tokenMetaData = await Promise.all(metaDataPromises);

  const mergedTokenData = filteredTokens.map((token, i) => {
    return { ...token, ...tokenMetaData[i] };
  });

  console.log({ mergedTokenData });

  return mergedTokenData;
};
