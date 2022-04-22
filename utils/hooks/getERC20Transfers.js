import { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api  } from "react-moralis";

export const getERC20Transfers = async() => {

    const [erc20Transfers, setERC20Trasnfers] = useState(null);
    const { account } = useMoralisWeb3Api();
    const { isInitialized, account: walletAddress , chainId  } = useMoralis();

    const fetchERC20Transfers = async() => {
        await account.getTokenTransfers({ address: walletAddress, chain: chainId }).then(result => {
            return result.result;
        });
    };

    useEffect(() => {
        if(isInitialized){
            fetchERC20Transfers().then(data => setERC20Trasnfers(data));
        }
    }, [ isInitialized, chainId, walletAddress ]);
    
    return { erc20Transfers, fetchERC20Transfers, chainId  }
};
