import React from 'react';
import { useMoralis } from 'react-moralis';
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import { Divider, Button } from '@material-ui/core';
import { BiLogOutCircle } from 'react-icons/bi';
import router from 'next/router';

const UserProfile = () => {
    const [avatar, setAvatar] = React.useState(null);
    const { isAuthenticated, user, authenticate, logout } = useMoralis();

    const getProfileImage = async() => {
        const url = await axios.get("/api/getUserProfileImage");
        setAvatar(url?.data?.data);
    };

    React.useEffect(() => {
        getProfileImage();
    }, []);

    return (
        <div style={{ display: 'flex', padding: '10px' }}>
            <Avatar src={avatar} className="m-auto text-center" />
            {/* <p><span className="text-xs text-gray-500">{user?.attributes?.username}</span></p>
            <span className="text-xs text-gray-600">{user?.attributes.ethAddress}</span> */}
            <Button onClick={() => {
                logout();
                router.push("/")
            }}
                variant="outlined"
                color="warning"
                startIcon={<BiLogOutCircle size={18} />}
                style={{ textTransform: 'none', marginTop: 10, marginBottom: 10, border: 'none' }}
            >
                Logout
            </Button>
        </div>
    );
};
export default UserProfile;
