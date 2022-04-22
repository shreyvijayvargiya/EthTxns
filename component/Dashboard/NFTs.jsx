import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';
import { getNfts } from '../../utils/hooks/getNft';

const NftsPage = () => {
    const [data, setData] = useState({
        loading: true,
        nfts: ''
    });
   
    const nfts = getNfts();
    
    const fetchNfts = () => {
        nfts.then(data => setData((prevState) => ({ ...prevState, nfts: data, loading: false }))).catch(error => console.log(error, 'error'));
    };

    useEffect(async() => {
        fetchNfts()
    }, []);

    
    return (
        <div>
            <h2> NFTs </h2>
            {data.loading ?<p>Fetching NFT's...</p>:
            data.tokenTransfers ? <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Symbol</TableCell>
                    <TableCell align="left">Token address</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data?.data?.map((row) => (
                    <TableRow
                    key={row.block_hash}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <p className="text-xs ellipsis">
                            {row.name}
                        </p>
                    </TableCell>
                    <TableCell align="left">
                        <p className="text-xs ellipsis">{row.amount}</p>
                    </TableCell>
                    <TableCell align="left">
                        <p className="text-xs ellipsis">
                            {row.symbol}
                        </p>
                    </TableCell>
                    <TableCell align="left">
                        <p className="text-xs ellipsis">
                            {row.token_address}
                        </p>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>: <p className="text-xs">No NFT's found</p>}
            <br />
            <Button variant="outlined" color="secondary" style={{ textTransform: 'none'}} onClick={fetchNfts} size="sm">Fetch NFTS</Button>
        </div>
    );
};
export default NftsPage;
