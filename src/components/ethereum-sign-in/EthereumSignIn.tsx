import { ethers } from "ethers";
import React from "react";
import { CustomButton } from "../custom-button/CustomButton";
import { SiweMessage } from "siwe";
import { Grid } from "@mui/material";
import { CUSTOM_MESSAGE } from "../../constants";

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
    CUSTOM_MESSAGE,
    domain,
    origin
  );
  const signature = await signer.signMessage(message);

  localStorage.setItem("signature", signature);
};

export const SignInWithEthereum = ({
  signer,
  domain,
  origin,
}: SignInWithEthereumType) => {
  return (
    <>
      <CustomButton
        label="Sign in with Ethereum"
        clickHandler={() => signInWithEthereum({ signer, domain, origin })}
      />
      <div style={{ marginBottom: "40px" }}>{CUSTOM_MESSAGE}</div>
    </>
  );
};
