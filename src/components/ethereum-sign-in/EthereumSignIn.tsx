import { ethers } from "ethers";
import React from "react";
import { Button } from "../button/Button";
import { SiweMessage } from "siwe";

type SignInWithEthereumType = {
  signer: ethers.providers.JsonRpcSigner;
  domain?: string;
  origin?: string;
};

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

export const signInWithEthereum = async ({
  signer,
  domain,
  origin,
}: SignInWithEthereumType) => {
  const message = createSiweMessage(
    await signer.getAddress(),
    "Sign in with Ethereum to the app.",
    domain,
    origin
  );
  await signer.signMessage(message);
};

export const SignInWithEthereum = ({
  signer,
  domain,
  origin,
}: SignInWithEthereumType) => {
  return (
    <Button
      label="Sign in with Ethereum"
      clickHandler={() => signInWithEthereum({ signer, domain, origin })}
    />
  );
};
