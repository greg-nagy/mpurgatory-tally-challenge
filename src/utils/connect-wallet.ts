import { ethers } from "ethers";

export const connectWallet = async (
  provider: ethers.providers.Web3Provider
) => {
  const address = await provider.send("eth_requestAccounts", []);
  return address.toString();
};
