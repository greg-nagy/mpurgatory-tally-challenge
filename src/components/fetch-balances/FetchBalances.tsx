import { ethers } from "ethers";
import React from "react";
import { CustomButton } from "../custom-button/CustomButton";
import { SiweMessage } from "siwe";
import { Grid } from "@mui/material";
import { CUSTOM_MESSAGE, TEST_WALLET } from "../../constants";
import { AlchemyWeb3, createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Alchemy, Network, TokenBalancesResponse } from "alchemy-sdk";
import { createTableRows } from "../../utils/create-table-rows";

//MAIN NET
const apiKey = process.env.REACT_APP_MAIN_NET_API_KEY;
const apiEndpoint = process.env.REACT_APP_MAIN_NET_ENDPOINT;
const network = Network.ETH_MAINNET;

//GOERLI NET
// const apiKey = process.env.REACT_APP_GOERLI_API_KEY;
// const apiEndpoint = process.env.REACT_APP_GOERLI_ENDPOINT;
// const network = Network.ETH_GOERLI;

const webMain = createAlchemyWeb3(`${apiEndpoint}${apiKey}`);

const alchemy = new Alchemy({
  apiKey,
  network,
});

type FetachBalancesType = {
  setLoading: (value: React.SetStateAction<boolean>) => void;
  setTokenRows: React.Dispatch<any>;
  walletAddress: string;
};

export const FetchBalances = ({
  setLoading,
  setTokenRows,
  walletAddress,
}: FetachBalancesType) => {
  const getTokenData = async (
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

  const getTokenBalance = async (tokenAddresses?: string[]) => {
    const balances = await webMain.alchemy.getTokenBalances(
      walletAddress,
      tokenAddresses
    );
    console.log({ balances });
    return balances;
  };

  const fetchBalances = async () => {
    if (!webMain) return window.alert("Please connect a wallet");
    setLoading(true);
    const tokens = await getTokenBalance();
    const tokenData = await getTokenData(tokens, alchemy);
    setTokenRows(createTableRows(tokenData as any));
    setLoading(false);
  };

  return <CustomButton label="Fetch balances" clickHandler={fetchBalances} />;
};
