import { useEffect, useState } from "react"
import { useMoralisWeb3Api, useMoralis, useChain } from "react-moralis";

export const getTokenBalances = async() => {
    const [token, setToken] = useState();
    const { account } = useMoralisWeb3Api();
    const { account: walletAddress } = useMoralis();
    const { chain } = useChain();

    const fetchTokens = async() => {
        await account.getTokenBalances({ chain: chain?.chainId, address: walletAddress }).then(result => result).catch(error => console.log("error"))    
    };

    useEffect(async() => {
        fetchTokens().then(data => setToken(data));
    }, [ walletAddress, chain?.chainId ]);

    return token;
}