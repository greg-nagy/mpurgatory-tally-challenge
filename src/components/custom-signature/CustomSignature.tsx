import { Grid, TextField } from "@mui/material";
import { ethers } from "ethers";
import React, { useState } from "react";
import { CUSTOM_MESSAGE } from "../../constants";
import { CustomButton } from "../custom-button/CustomButton";

export const customSignature = async (
  signer: ethers.providers.JsonRpcSigner,
  message: string,
  walletAddress: string
) => {
  let signature = await signer.signMessage(message);

  const address = ethers.utils.verifyMessage(message, signature);

  console.log({ address, walletAddress });
  if (address.toUpperCase() !== walletAddress.toUpperCase())
    return alert("Signature cannot be verified");

  localStorage.setItem("signature", signature);
};

export const CustomSignature = ({
  walletAddress,
  signer,
}: {
  walletAddress: string;
  signer: ethers.providers.JsonRpcSigner;
}) => {
  const [message, setMessage] = useState("");

  return (
    <Grid alignItems="center" justifyContent="center" container>
      <div style={{ marginBottom: "40px", marginRight: "10px" }}>
        {walletAddress ? (
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            id="outlined-basic"
            label="Sign"
            variant="outlined"
          />
        ) : null}
      </div>
      <CustomButton
        label="Sign message"
        clickHandler={() => customSignature(signer, message, walletAddress)}
      />
    </Grid>
  );
};
