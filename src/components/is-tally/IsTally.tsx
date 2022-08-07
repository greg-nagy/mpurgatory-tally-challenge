import React, { FunctionComponent } from "react";

export const IsTally: FunctionComponent = () => {
  if ((window as any).ethereum.isTally) {
    return <div>Tally Cash Wallet: True</div>;
  } else {
    return <div>Tally Cash Wallet: False</div>;
  }
};
