import { useEffect, useState } from "react"
import { useMoralisWeb3Api, useMoralis, useChain } from "react-moralis";

export const getNFTTransfers = async() => {
    const [nftsTransfers, setNftsTransfers] = useState();
    const { account } = useMoralisWeb3Api();
    const { account: walletAddress } = useMoralis();
    const { chain } = useChain();

    const fetchTokens = async() => {
        await account.getNFTTransfers({ chain: chain?.chainId, address: walletAddress }).then(result => result).catch(error => console.log("error"))    
    };

    useEffect(() => {
        fetchTokens().then(data => setNftsTransfers(data));
    }, [ walletAddress, chain?.chainId ]);

    return nftsTransfers;
}