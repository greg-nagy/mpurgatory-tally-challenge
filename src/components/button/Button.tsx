import React from "react";
import "./Button.css";

type ButtonType = {
  label: string;
  clickHandler: () => Promise<void>;
};

export const Button = ({ label, clickHandler }: ButtonType) => {
  return (
    <button className="btn" onClick={clickHandler} type="button">
      <span>{label}</span>
    </button>
  );
};
