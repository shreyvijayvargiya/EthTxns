import React, { useEffect, useState } from 'react';
import { getNativeBalances } from '../../utils/api/getNativeBalances';
import { Button } from '@material-ui/core';
import { fetchTokenMetadata } from '../../utils/api/getTokenMetadata';

const WalletPage = () => {

    const [data, setData] = useState();

    const balances = getNativeBalances();

    const fetchBalances = () => {
        balances.then(data => {
            console.log(data, 'data');
            setData(data)
        }).catch(error => console.log(error));
    };

    const tokensMetadata = fetchTokenMetadata();

    const fetchTokens = async() => {
        const data = await tokensMetadata;
        console.log(data)
    }

    useEffect(() => {
        fetchBalances();
        fetchTokens();
    }, []);


    return (
        <div>
            <h2>Token balances</h2>
            <table style={{ border: '1px solid #eeeeee', borderRadius: 9 }}>
                <tbody>
                    <tr className="tableRow">
                        <td style={{ padding: 10, minWidth: '400px' }}>
                            <p>Native Balances</p>
                        </td>
                        <td style={{ padding: 10, textAlign: 'right' }}>
                            <p>{data}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <Button onClick={fetchBalances} variant="outlined" style={{ textTransform: 'none'}} size="sm">
                Fetch Native Balance
            </Button>
        </div>
    );
};
export default WalletPage;
