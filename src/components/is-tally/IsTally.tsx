import React, { FunctionComponent } from "react";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CheckIcon from "@mui/icons-material/Check";

export const IsTally: FunctionComponent = () => {
  if ((window as any).ethereum.isTally) {
    return (
      <div>
        Tally Cash Wallet:{" "}
        <CheckIcon style={{ color: "green", verticalAlign: "sub" }} />
      </div>
    );
  } else {
    return (
      <div>
        Tally Cash Wallet:{" "}
        <DoNotDisturbAltIcon style={{ color: "red", verticalAlign: "sub" }} />
      </div>
    );
  }
};
