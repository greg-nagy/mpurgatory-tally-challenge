import React, { FunctionComponent, useState } from "react";
import "./App.css";
import { Button } from "./components/button/Button";
import { ethers } from "ethers";
import { createAlchemyWeb3, TokenBalancesResponse } from "@alch/alchemy-web3";
import { connectWallet } from "./utils/connect-wallet";
import { signInWithEthereum } from "./utils/signin-with-ethereum";
import { getTokenBalance } from "./utils/get-token-balances";
import { customSignature } from "./utils/custom-signature";
import { createTableRows } from "./utils/create-table-rows";
import { CUSTOM_MESSAGE, TEST_WALLET } from "./constants";
import { IsTally } from "./components/is-tally/IsTally";
import { Alchemy, Network } from "alchemy-sdk";
import { CustomTable } from "./components/table/Table";
import { tableColumns } from "./utils/table-coulmns";
import { getTokenData } from "./utils/get-token-data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ConnectWallet } from "./components/connect-wallet/ConnectWallet";
import { SignInWithEthereum } from "./components/ethereum-sign-in/EthereumSignIn";
import { CustomSignature } from "./components/custom-signature/CustomSignature";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();

//MAIN NET
const apiKey = process.env.REACT_APP_MAIN_NET_API_KEY;
const apiEndpoint = process.env.REACT_APP_MAIN_NET_ENDPOINT;
const network = Network.ETH_MAINNET;

//GOERLI NET
// const apiKey = process.env.REACT_APP_GOERLI_API_KEY;
// const apiEndpoint = process.env.REACT_APP_GOERLI_ENDPOINT;
// const network = Network.ETH_GOERLI;

const testWallet = TEST_WALLET;

const webMain = createAlchemyWeb3(`${apiEndpoint}${apiKey}`);

const alchemy = new Alchemy({
  apiKey,
  network,
});

function App() {
  //Local state
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenRows, setTokenRows] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  //fetch token click handler
  const fetchBalances = async () => {
    if (!testWallet) return window.alert("Please connect a wallet");
    setLoading(true);
    const tokens = await getTokenBalance(webMain, testWallet);
    const tokenData = await getTokenData(tokens, alchemy);
    setTokenRows(createTableRows(tokenData as any));
    setLoading(false);
  };

  const getWalletAddress = async () => {
    setWalletAddress(await connectWallet(provider));
  };

  return (
    <div className="App">
      {walletAddress ? <IsTally /> : ""}
      <div>{`Account:${walletAddress}`}</div>

      <ConnectWallet provider={provider} setWalletAddress={setWalletAddress} />
      <SignInWithEthereum signer={signer} domain={domain} origin={origin} />
      <CustomSignature signer={signer} walletAddress={walletAddress} />

      <Button label="Fetch balances" clickHandler={fetchBalances} />
      <div className="table-container">
        {loading ? <Skeleton count={20} /> : null}
        {!tokenRows || loading ? null : (
          <CustomTable columns={tableColumns} data={tokenRows} />
        )}
      </div>
    </div>
  );
}

export default App;
