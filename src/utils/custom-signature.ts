import { ethers } from "ethers";

export const customSignature = async (
  signer: ethers.providers.JsonRpcSigner,
  customMessage: string
) => {
  let signature = await signer.signMessage(customMessage);
  //console.log("!!!", signature);
  //let address = ethers.utils.verifyMessage(customMessage, signature);

  localStorage.setItem("signature", signature);
};
