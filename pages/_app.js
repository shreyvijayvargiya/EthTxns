
import React from 'react';
import { MoralisProvider } from 'react-moralis';
import 'tailwindcss/tailwind.css';
import '../global.css';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {

    return (
        <MoralisProvider appId={process.env.appId} serverUrl={process.env.serverUrl}>
            <Component {...pageProps} />
        </MoralisProvider>
    );
};
export default MyApp;
