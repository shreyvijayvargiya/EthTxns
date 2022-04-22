import React from 'react';
import { AppBar, Button, Divider } from '@material-ui/core';
import { AiOutlineTransaction } from 'react-icons/ai';
import { FaNetworkWired } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import router from 'next/router';
import UserProfile from './UserProfile';
import { RiCoinsLine } from 'react-icons/ri';
import { SiNetflix } from 'react-icons/si';

const NavbarComponent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }} 
            className="shadow-2xl l-0 r-0 w-screen"
        >
            <p style={{ color: 'indigo', textDecoration: "underline", margin: '10px' }}>
                <a href="/">EthTxn</a>
            </p>
            <div className="flex justify-around items-center gap-2">
                <Button onClick={() => router.push("/dashboard?type=transfers")}
                    variant="outlined"
                    color="secondary"
                    startIcon={<AiOutlineTransaction size={18} />}
                    style={{ textTransform: 'none', marginTop: 10, marginBottom: 10, border: 'none' }}
                >
                    Transactions
                </Button>
                <Button onClick={() => router.push("/dashboard?type=balances")}
                    variant="outlined"
                    color="success"
                    startIcon={<MdAccountBalance size={18} />}
                    style={{ textTransform: 'none', marginTop: 10, marginBottom: 10, border: 'none' }}
                >
                    Balances
                </Button>
                <Button onClick={() => router.push("/dashboard?type=network")}
                    variant="outlined"
                    color="primary"
                    startIcon={<FaNetworkWired size={18} />}
                    style={{ textTransform: 'none', marginTop: 10, marginBottom: 10, border: 'none' }}
                >
                    Network
                </Button>
            </div>
            <UserProfile />
        </div>
    );
};

export default NavbarComponent;
