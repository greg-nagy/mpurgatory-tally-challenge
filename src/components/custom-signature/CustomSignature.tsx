import { ethers } from "ethers";
import React from "react";
import { CUSTOM_MESSAGE } from "../../constants";
import { Button } from "../button/Button";

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
    <div>
      <span>{walletAddress ? CUSTOM_MESSAGE : ""}</span>
      <Button
        label="Sign message"
        clickHandler={() => customSignature(signer)}
      />
    </div>
  );
};
