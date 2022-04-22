import React, { useEffect, useState } from 'react';
import { useChain, useMoralis, useMoralisWeb3Api } from 'react-moralis';

export const getTransactions = () => {
    const { account } = useMoralisWeb3Api();
    const { chain } = useChain();
    const { account: walletAddress } = useMoralis();
    const [transaction, setTransaction] = useState(null);

    const fetchTransactions = async() => {
        const data = await account.getTransactions({
          chain: chain?.chainId,
          address: walletAddress,
        });
        setTransaction(data);
        return data;
        // await account.getTransactions({ chain: chain?.chainId, address: walletAddress }).then(result => {
        //     result.result
        // })
        // .catch(error => console.log(error, 'error in fetching transactions'))
    };

    useEffect(async() => {
        await fetchTransactions();
    }, [ chain?.chainId, walletAddress  ])

    return transaction;
}