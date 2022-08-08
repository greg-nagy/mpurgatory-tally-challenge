import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from "@mui/material";

export const TokenTable = ({
  rows,
  loading,
}: {
  rows: any;
  loading: boolean;
}) => {
  console.log({ rows });
  if (loading) return <Skeleton variant="rectangular" height={700} />;
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Token icon</TableCell>
            <TableCell align="right">Current balance</TableCell>
            <TableCell align="right">Token symbol</TableCell>
            <TableCell align="right">Token name</TableCell>
            <TableCell align="right">Contract address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img style={{ height: "30px" }} src={row.icon} />
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
