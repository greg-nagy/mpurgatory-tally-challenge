import React from "react";
import Table from "rc-table";
import "./Table.css";

export const CustomTable = ({ columns, data }: { columns: any; data: any }) => {
  if (!data) return null;
  return <Table columns={columns} data={data} />;
};
