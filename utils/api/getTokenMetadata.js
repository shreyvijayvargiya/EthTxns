import React from "react";
import { useMoralisWeb3Api } from "react-moralis";


export const fetchTokenMetadata = async (address, chain) => {
  //Get metadata for one token. Ex: USDT token on ETH
    const Web3Api = useMoralisWeb3Api();
    const options = {
        chain: "Eth",
        addresses: "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
    };
    const tokenMetadata = await Web3Api.token.getTokenMetadata(options);
    console.log(tokenMetadata);
    return tokenMetadata;
};