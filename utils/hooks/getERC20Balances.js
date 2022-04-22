import { useEffect, useState } from "react";
import {  useMoralisWeb3Api, useMoralis } from 'react-moralis';

export const getERC20Balances = async() => {
    const [ erc20Balances, setERC20Balances] = useState(null);
    const { account } = useMoralisWeb3Api();
    const {  isInitialized, account: walletAddress, chainId } = useMoralis();

    const fetchERC20Balances = async() => {
        await account.getTokenBalances({ address: walletAddress, chain: chainId }).then(result => result.result);
    };

    useEffect(() => {
        fetchERC20Balances().then(data => setERC20Balances(data));
    }, [ isInitialized, chainId, walletAddress ]);
    
    return { fetchERC20Balances, chainId, erc20Balances };
}