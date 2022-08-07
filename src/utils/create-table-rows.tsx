type TableRowType = {
  decimals: number | null;
  logo: string | null;
  name: string | null;
  symbol: string | null;
  contractAddress: string;
  tokenBalance: string;
  error: null;
};

export const createTableRows = (TokenData: TableRowType[]) => {
  return TokenData.map((token, i) => {
    return {
      icon: token.logo,
      balance: token.tokenBalance,
      symbol: token.symbol,
      name: token.name,
      address: token.contractAddress,
      key: i,
    };
  });
};
