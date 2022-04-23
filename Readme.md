### Tracelabs project 
> This project is the mini/basic version of Etherscan.io website. Once the user logged in the dashboard display all the Eth tansactions user have made using the block number via his/her wallet. In addition, user can filter the transactions using date and block number. The list of transactions contains the block number, hash number, amount of ETH, wallet addresses including both sender and receipent. 

### Prerequisite
1. Node > 14
2. yarn or npm
3. Moralis server on moralis.io

### Setup

```
yarn
yarn run dev
```

### Why moralis 
> Moralis is the firebase for crypto and web3 projects. For this kind of project we can either choose Etherscan.io API to fetch the user transactions using block number where as we can choose moralis server that provide in house support for wallet connectivity like metamask and its easy to use SDK makes everything simple and scaleable and easy to maintain. So even if we want to add more functionality to this project for example providing NFT's details or minting NFTs moralis will certainly help us to do so, hence making it a good choice for this project.

### Working process
> Once user logged in using metamask he will redirect to the dashboard on the transfers page where he can view all the transactions of a specific address. In addition, user can search the transactions from specific block number and can filter the same using date. Default address is also added so if user clicked the fetch transfer button than using that default address the transactions are fetched.

