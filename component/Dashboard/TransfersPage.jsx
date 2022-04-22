import React, { useEffect, useState } from "react";
import { getTransactions } from "../../utils/hooks/getTransactions";
import { getCurrenctBlockNumberUsingDate } from "../../utils/hooks/getCurentBlockDate";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import { Button } from "@material-ui/core";


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState({
    loading: true,
    data: [],
  });
  const [date, setDate] = useState(new Date());

  const [search, setSearch] = useState({
    walletAddress: "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
    block_number: "",
  });
  
  const transaction = getTransactions(search.walletAddress, search.block_number);
  const currentBlockByDate = getCurrenctBlockNumberUsingDate();

  const fetchTransactons = async () => {
    setTransactions({ loading: true, data:[] });
    setTimeout(async() => {
        const data = await transaction;
        setTransactions({ loading: false, data: data?.result });
        console.log(data.result[0])
    }, 2000);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearch(prevState => ({ 
        ...prevState,  [name]: value
    }));
  };

  const dateChange = (e) => {
    const newDate = e.target.value;
    console.log(Date(newDate.substr(0, 25)))
    setDate(e.target.value)
  }

  return (
    <div>
        <h2> Transactions </h2>
        <div className="flex justify-between items-center gap-8 my-4">
            <TextField
                name="walletAddress"
                fullWidth
                size="small"
                placeholder="Enter wallet address"
                variant="outlined"
                color="primary"
                onChange={handleInputChange}
            />
            <TextField
                name="block_number"
                fullWidth
                size="small"
                placeholder="Enter block number"
                variant="outlined"
                color="primary"
                onChange={handleInputChange}
            />
        </div>
        <div className="flex justify-start items-center gap-8 my-4">
            <TextField type="date" size="small" variant="outlined" onChange={dateChange} value={date} />
            <Button
                variant="outlined"
                color="secondary"
                style={{ textTransform: "none" }}
                onClick={fetchTransactons}
                size="sm"
                disabled={transactions?.data?.loading}
            >
                Fetch Transfers
            </Button>
        </div>
        <br />
        <Table
            sx={{ minWidth: 300 }}
            aria-label="simple table"
        >
            <TableHead>
                <TableRow>
                    <TableCell>To Address</TableCell>
                    <TableCell align="right">From Address</TableCell>
                    <TableCell align="right">Block Number</TableCell>
                    <TableCell align="right">Value</TableCell>
                </TableRow>
            </TableHead>
        </Table>
        <div className="overflow-scroll h-4/5">
            <div className="h-4/5 overflow-scroll">
                {transactions.loading ? (
                    <p>Fetching transactions...</p>
                ) : transactions.data ? (
                    <Table
                        sx={{ minWidth: 300 }}
                        aria-label="simple table"
                    >
                    <TableBody>
                        {transactions?.data?.map((row, index) => (
                        <TableRow
                            key={row.block_number + index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell scope="row">
                                <p className="text-xs ellipsis">{row.to_address}</p>
                            </TableCell>
                            <TableCell align="left">
                                <p className="text-xs ellipsis">{row.from_address}</p>
                            </TableCell>
                            <TableCell align="left">
                                <p className="text-xs ellipsis">{row.block_number}</p>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-xs ellipsis">{row.value}</p>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                ) : (
                    <p className="text-xs">No transactions found</p>
                )}
            </div>
        </div>
    </div>
  );
};
export default TransactionsPage;
