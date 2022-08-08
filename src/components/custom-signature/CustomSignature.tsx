import { ethers } from "ethers";
import React from "react";
import { CUSTOM_MESSAGE } from "../../constants";
import { CustomButton } from "../custom-button/CustomButton";

export const customSignature = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  let signature = await signer.signMessage(CUSTOM_MESSAGE);
  //console.log("!!!", signature);
  //let address = ethers.utils.verifyMessage(customMessage, signature);

  localStorage.setItem("signature", signature);
};

export const CustomSignature = ({
  walletAddress,
  signer,
}: {
  walletAddress: string | null;
  signer: ethers.providers.JsonRpcSigner;
}) => {
  return (
    <>
      <CustomButton
        label="Sign message"
        clickHandler={() => customSignature(signer)}
      />
      <div>{walletAddress ? CUSTOM_MESSAGE : ""}</div>
    </>
  );
};
