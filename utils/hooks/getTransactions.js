import React, { useEffect, useState } from 'react';
import { useChain, useMoralis, useMoralisWeb3Api } from 'react-moralis';

export const getTransactions = () => {
    const accountAddress = "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f";
    const { account } = useMoralisWeb3Api();
    const { chain } = useChain();
    const { account: walletAddress } = useMoralis();
    const [transaction, setTransaction] = useState(null);

    const fetchTransactions = async() => {
        const data = await account.getTransactions({
          chain: chain?.chainId,
          address: accountAddress,
        });
        setTransaction(data);
        return data;
    };

    useEffect(async() => {
        await fetchTransactions();
    }, [ chain?.chainId, walletAddress  ])

    return transaction;
}