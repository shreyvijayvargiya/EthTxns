import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';
import { getTokenTransfers } from '../../utils/hooks/getTokenTranfers';

const TokensPage = () => {

    const [data, setData] = useState({
        loading: true,
        tokenTransfers: '',
    });
   
    const tokenTransfers = getTokenTransfers();

    useEffect(async() => {
        tokenTransfers.then(data => setData((prevState) => ({ ...prevState, tokenTransfers: data, loading: false }))).catch(error => console.log(error, 'error'));
    }, []);

    const fetchTokenTransfer = () => {
        tokenTransfers.then(data => setData((prevState) => ({ ...prevState, tokenTransfers: data, loading: false }))).catch(error => console.log(error, 'error'));
    };

    
    return (
        <div>
            <h2> Token Transactions </h2>
            {data.loading ?<p>Fetching tokens...</p>:
            data.tokenTransfers ? <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>To Address</TableCell>
                    <TableCell align="left">From Address</TableCell>
                    <TableCell align="left">Hash</TableCell>
                    <TableCell align="left">Value</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data?.data?.map((row) => (
                    <TableRow
                    key={row.transaction_hash}
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
            </Table>: <p className="text-xs">No token transfers found</p>}
            <br />
            <Button variant="outlined" color="secondary" style={{ textTransform: 'none'}} onClick={fetchTokenTransfer} size="sm">Fetch Token Transfers</Button>
        </div>
    );
};
export default TokensPage;
