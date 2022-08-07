import { ethers } from "ethers";
import React from "react";
import { Button } from "../button/Button";

type ConnectWalletType = {
  provider: ethers.providers.Web3Provider;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
};

const connectWallet = async (provider: ethers.providers.Web3Provider) => {
  const address = await provider.send("eth_requestAccounts", []);
  return address.toString();
};

export const ConnectWallet = ({
  provider,
  setWalletAddress,
}: ConnectWalletType) => {
  return (
    <Button
      label="Connect Wallet"
      clickHandler={async () => setWalletAddress(await connectWallet(provider))}
    />
  );
};
