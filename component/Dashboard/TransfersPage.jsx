import React, { useEffect, useState } from 'react';
import { useChain, useMoralis, useMoralisQuery, useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3Transfer } from 'react-moralis';
import { getTransactions } from '../../utils/hooks/getTransactions';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { getERC20Balances } from '../../utils/hooks/getERC20Balances';
import { getTokenTransfers } from '../../utils/hooks/getTokenTranfers';
import { Button } from '@material-ui/core';
import { getNfts } from '../../utils/hooks/getNft';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState({
        loading: true,
        data: [],
    });
    const transaction = getTransactions();

    const fetchTransactons = async() => {
        const data = await transaction;
        setTransactions({ loading: false, data: data?.result })
    };

    useEffect(async() => {
        fetchTransactons();
    }, []);

    return (
        <div>
           <h2> Transactions </h2>
            {transactions.loading ?<p>Fetching transactions...</p>:
            transactions.data ? <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>To Address</TableCell>
                    <TableCell align="left">From Address</TableCell>
                    <TableCell align="left">Hash</TableCell>
                    <TableCell align="left">Value</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {transactions?.data?.map((row) => (
                    <TableRow
                    key={row.block_hash}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <p className="text-xs ellipsis">
                            {row.to_address}
                        </p>
                    </TableCell>
                    <TableCell align="left">
                        <p className="text-xs ellipsis">{row.from_address}</p>
                    </TableCell>
                    <TableCell align="left">
                        <p className="text-xs ellipsis">
                            {row.block_hash}
                        </p>
                    </TableCell>
                    <TableCell align="left">
                        <p className="text-xs ellipsis">
                            {row.value}
                        </p>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>: <p className="text-xs">No transactions found</p>}
            <br />
            <Button variant="outlined" color="secondary" style={{ textTransform: 'none'}} onClick={fetchTransactons} size="sm"
                disabled={transactions?.data?.length > 0 ? true: false}
            >Fetch Transfers</Button>
        </div>
    );
};
export default TransactionsPage;
