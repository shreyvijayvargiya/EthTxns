import React, { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import router from 'next/router';
import Body from './Body';
import NavbarComponent from './Navbar';

const Dashboard = () => {

    const { isAuthenticated, user } = useMoralis();
    
    useEffect(() => {
        if(!isAuthenticated) router.push("/")
    }, [ isAuthenticated ]);

    return (
        <div>
            <NavbarComponent />
            <br />
            <br />
            <Body />
        </div>
    );
};
export default Dashboard;
