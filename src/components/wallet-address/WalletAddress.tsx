import React, { FunctionComponent } from "react";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CheckIcon from "@mui/icons-material/Check";

export const WalletAddress = ({ walletAddress }: { walletAddress: string }) => {
  return (
    <div className="wallet-address">
      <span className="quicksand">Address:</span>
      <span className="quicksand-color">{walletAddress}</span>
    </div>
  );
};
