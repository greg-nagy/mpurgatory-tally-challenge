import React, { FunctionComponent, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { TEST_WALLET } from "./constants";
import { IsTally } from "./components/is-tally/IsTally";
import { CustomTable } from "./components/table/Table";
import { tableColumns } from "./utils/table-coulmns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ConnectWallet } from "./components/connect-wallet/ConnectWallet";
import { SignInWithEthereum } from "./components/ethereum-sign-in/EthereumSignIn";
import { FetchBalances } from "./components/fetch-balances/FetchBalances";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();

function App() {
  //Local state
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenRows, setTokenRows] = useState<any>(null);
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
        <div className="table-container">
          {loading ? <Skeleton count={20} /> : null}
          {!tokenRows || loading ? null : (
            <CustomTable columns={tableColumns} data={tokenRows} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
