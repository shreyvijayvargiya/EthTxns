import { useEffect, useState } from "react"
import { useMoralisWeb3Api, useMoralis, useChain } from "react-moralis";

export const getNfts = async() => {
    const [nfts, setNfts] = useState();
    const { account } = useMoralisWeb3Api();
    const { account: walletAddress } = useMoralis();
    const { chain } = useChain();

    const fetchTokens = async() => {
        await account.getNFTs({ chain: chain?.chainId, address: walletAddress }).then(result => result).catch(error => console.log("error"))    
    };

    useEffect(() => {
        fetchTokens().then(data => setNfts(data));
    }, [ walletAddress, chain?.chainId ]);

    return nfts;
}