import React from "react";

export const tableColumns = [
  {
    title: "Token icon",
    dataIndex: "icon",
    key: "icon",
    width: 100,
    render: (data: any) => <img className="icon" src={data} />,
  },
  {
    title: "Current balance",
    dataIndex: "balance",
    key: "balance",
    width: 100,
  },
  {
    title: "Token symbol",
    dataIndex: "symbol",
    key: "symbol",
    width: 100,
  },
  {
    title: "Token name",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "Contract address",
    dataIndex: "address",
    key: "address",
    width: 100,
  },
];
