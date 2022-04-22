import React, { useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';

export const getCurrenctBlockNumberUsingDate = async() => {

    const [ latestBlocNumber, setLatestBlockNumber ] = useState("");
    const { native } = useMoralisWeb3Api();

    const fetchBlockNumber = async() => {
        const data = await native.getDateToBlock({ date: Date.now() });
        setLatestBlockNumber(data.block);
    };
    
    useEffect(async() => {
        await fetchBlockNumber();
    }, []);

    return latestBlocNumber;

};
