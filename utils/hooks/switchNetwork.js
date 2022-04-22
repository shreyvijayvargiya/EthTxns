import { useMoralis, useChain } from "react-moralis"

export const switchNetwork = async(chainId, chainName, rpcUrl, blockUrl) => {
    const { switchNetwork } = useChain();
    console.log(switchNetwork, '');
}