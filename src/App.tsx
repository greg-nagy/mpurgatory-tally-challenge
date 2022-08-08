import React, { FunctionComponent, useState } from "react";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ethers } from "ethers";
import { TEST_WALLET } from "./constants";
import { IsTally } from "./components/is-tally/IsTally";
import { ConnectWallet } from "./components/connect-wallet/ConnectWallet";
import { SignInWithEthereum } from "./components/ethereum-sign-in/EthereumSignIn";
import { FetchBalances } from "./components/fetch-balances/FetchBalances";
import { TokenTable } from "./components/token-table/TokenTable";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();

function App() {
  //Local state
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenRows, setTokenRows] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <div className="wallet-address">{`Address:${walletAddress}`}</div>
      <div className="is-tally">{walletAddress ? <IsTally /> : ""}</div>

      <div className="container">
        <ConnectWallet
          provider={provider}
          setWalletAddress={setWalletAddress}
        />
        {walletAddress ? (
          <>
            <SignInWithEthereum
              signer={signer}
              domain={domain}
              origin={origin}
            />

            <FetchBalances
              setLoading={setLoading}
              setTokenRows={setTokenRows}
              walletAddress={TEST_WALLET}
            />
          </>
        ) : null}
        {tokenRows.length ? (
          <TokenTable loading={loading} rows={tokenRows} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
