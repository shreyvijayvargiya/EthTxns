
import React, { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { Button } from '@material-ui/core';
import { Login } from '../component';
import Head from 'next/head';

const Home = () => {
	

	const { isAuthenticated, user, authenticate, logout } = useMoralis();

	return (
    <div>
      <Head>
        <title>EthTxn</title>
        <meta name="title" content="EthTxn" />
      </Head>
      <Login />
    </div>
  );
};
export default Home
