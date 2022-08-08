import React, { useState } from "react";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ethers } from "ethers";
//import { TEST_WALLET } from "./constants";
import { IsTally } from "./components/is-tally/IsTally";
import { ConnectWallet } from "./components/connect-wallet/ConnectWallet";
import { SignInWithEthereum } from "./components/ethereum-sign-in/EthereumSignIn";
import { FetchBalances } from "./components/fetch-balances/FetchBalances";
import { TokenTable } from "./components/token-table/TokenTable";
import { WalletAddress } from "./components/wallet-address/WalletAddress";
import { CustomSignature } from "./components/custom-signature/CustomSignature";
import { Skeleton } from "@mui/material";

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
      <WalletAddress walletAddress={walletAddress} />
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
              walletAddress={walletAddress}
            />

            <CustomSignature walletAddress={walletAddress} signer={signer} />

            <FetchBalances
              setLoading={setLoading}
              setTokenRows={setTokenRows}
              walletAddress={walletAddress}
            />
          </>
        ) : null}
        {loading ? <Skeleton variant="rectangular" height={700} /> : null}
        {tokenRows.length ? <TokenTable rows={tokenRows} /> : null}
      </div>
    </div>
  );
}

export default App;
