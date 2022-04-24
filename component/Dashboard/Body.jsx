import React, { useState } from 'react';
import NetworksPage from './Network';
import TransactionsPage from './TransfersPage';
import SwapPage from './Swap';
import WalletPage from './Wallet';
import { useRouter } from 'next/router';
import { Card, makeStyles } from '@material-ui/core';


const Body = () => {
    const router = useRouter();

    const styles = useStyles();
    return (
        <div className={styles.root}>
            <Card variant="outlined" style={{ padding: 10, minWidth: '70%', minHeight: '40vh' }}>
                {router.query.type === "network" && <NetworksPage />}
                {router.query.type === "balances" && <WalletPage />}
                {router.query.type === undefined || router.query.type === "transfers" && <TransactionsPage />}
                {router.query.type === 'DeX' && <SwapPage />}
            </Card>
        </div>
    );
};
export default Body;


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))