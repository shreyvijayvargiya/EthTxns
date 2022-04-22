import React from 'react';
import { Dashboard } from '../component';
import Head from 'next/head';

const DashboardPage = () => {
    return (
        <div>
            <Head>
                <title>EthTxn || Dashboard</title>
            </Head>
            <Dashboard />
        </div>
    );
};
export default DashboardPage;
