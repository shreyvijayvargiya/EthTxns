import React, { useEffect, useState } from 'react';
import { useChain, useMoralis, useMoralisWeb3Api } from 'react-moralis';

export const getTransactions = (accountAddress, block_number, latestBlocNumber ) => {
    const { account } = useMoralisWeb3Api();
    const { chain } = useChain();
    const { account: walletAddress } = useMoralis();
    const [transaction, setTransaction] = useState(null);

    const fetchTransactions = async() => {
        const data = await account.getTransactions({
            chain: chain?.chainId,
            address: accountAddress,
            from_block: block_number.toString()
        });
        setTransaction(data);
        return data;
    };

    useEffect(async() => {
        await fetchTransactions();
    }, [ chain?.chainId, walletAddress  ])

    return transaction;
}