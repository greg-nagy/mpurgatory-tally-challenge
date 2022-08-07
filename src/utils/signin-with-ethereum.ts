import { ethers } from "ethers";
import { SiweMessage } from "siwe";

const createSiweMessage = (
  address: string,
  statement: string,
  domain?: string,
  origin?: string
) => {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
  });

  return message.prepareMessage();
};

export const signInWithEthereum = async (
  signer: ethers.providers.JsonRpcSigner,
  domain?: string,
  origin?: string
) => {
  const message = createSiweMessage(
    await signer.getAddress(),
    "Sign in with Ethereum to the app.",
    domain,
    origin
  );
  await signer.signMessage(message);
};
