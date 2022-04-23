import React, { useEffect, useState } from "react";
import { getTransactions } from "../../utils/hooks/getTransactions";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import {  useChain, useMoralisWeb3Api } from 'react-moralis';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState({
        loading: true,
        data: [],
    });
    const [date, setDate] = useState(new Date());
    const { native } = useMoralisWeb3Api();
    const { chain } = useChain();

    const [search, setSearch] = useState({
        walletAddress: "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
        block_number: "",
    });

    const transaction = getTransactions(search.walletAddress, search.block_number);
    
    const fetchTransactons = async () => {
        setTransactions({ loading: true, data:[] });
        setTimeout(async() => {
            const data = await transaction;
            setTransactions({ loading: false, data: data?.result });
        }, 2000);
    };

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearch(prevState => ({ 
            ...prevState,  [name]: value
        }));
    };

    const dateChange = async(e) => {
        const value = e.target.value;
        setTransactions({ loading: true, data: [] });
        setDate(value);
        const newDate = new Date(value).toISOString();
        const data = await native.getDateToBlock({ chain: chain?.chainId, date: newDate });
        setTransactions({ loading: false, data: data?.result });
    };


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
          defaultValue={search.walletAddress}
          onChange={handleInputChange}
          helperText="Default address: 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f"
        />
        <TextField
          name="block_number"
          fullWidth
          size="small"
          placeholder="Enter block number"
          variant="outlined"
          color="primary"
          onChange={handleInputChange}
          helperText="Search transaction from the entered block number"
        />
      </div>
      <div className="flex justify-start items-center gap-8 my-4">
        <TextField
          type="date"
          size="small"
          variant="outlined"
          onChange={dateChange}
          value={date}
          helperText="Get balance at the particular date"
        />
        <div>
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
            <br />
            <br />
        </div>
      </div>
      <br />
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
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
            <p className="m-4">Fetching transactions...</p>
          ) : transactions.data && transactions.data.length > 0 ? (
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
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
            <p className="text-xs m-4">No transactions found</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TransactionsPage;
