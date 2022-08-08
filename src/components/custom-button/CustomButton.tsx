import { Button } from "@mui/material";
import React from "react";

type ButtonType = {
  label: string;
  clickHandler: () => Promise<void>;
};

export const CustomButton = ({ label, clickHandler }: ButtonType) => {
  return (
    <div style={{ display: "block", marginBottom: "40px" }}>
      <Button variant="contained" onClick={clickHandler}>
        {label}
      </Button>
    </div>
  );
};
