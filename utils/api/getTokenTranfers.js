import { useState, useEffect } from "react";
import { useChain, useMoralis, useMoralisWeb3Api  } from "react-moralis";

export const getTokenTransfers = async() => {
    const [tokenTransfers, setTokenTransfers ] = useState();
    const { account } = useMoralisWeb3Api();
    const { account: walletAddress } = useMoralis();
    const { chain } = useChain();

    const fetchTokenTransfers = async() => {
        await account.getTokenTransfers({ chain: chain?.chainId, address: walletAddress }).then(result => result).catch(error => console.log(error, 'error'));
    };
    useEffect(() => {
        fetchTokenTransfers().then(data => setTokenTransfers(data));
    }, [ chain?.chainId, walletAddress ]);
    return tokenTransfers;
}