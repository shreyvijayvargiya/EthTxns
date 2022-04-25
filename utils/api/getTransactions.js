import React, { useEffect, useState } from 'react';
import { useChain, useMoralis, useMoralisWeb3Api } from 'react-moralis';

export const getTransactions = async(accountAddress, block_number, account, chain ) => {
    let transaction;
    const data = await account.getTransactions({
        chain: chain?.chainId,
        address: accountAddress,
        from_block: block_number.toString()
    });
    transaction= data;
    return transaction;
}