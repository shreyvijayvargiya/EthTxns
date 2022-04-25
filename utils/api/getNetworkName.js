export function getNetworkName(chainID) {
    const networks = {
      1: "Ethereum Mainnet",
      4: "Ethereum Rinkeby",
      97: "Binance Smart Chain Testnet",
      80001: "Polygon Mumbai Testnet",
    };
    return networks[chainID];
}