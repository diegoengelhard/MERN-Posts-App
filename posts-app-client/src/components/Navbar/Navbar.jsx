import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Import MUI components
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

// Import toast
import { toast } from 'react-toastify';

// Import styles
import useStyles from './Navbar.styles';

const Navbar = () => {
    // Set states
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    if (user) {
        console.log('user exists');
        console.log('user:', user);
        console.log('user firstname:', user.user.firstname);
    }

    // Set dispatch
    const dispatch = useDispatch();

    // Set styles
    const classes = useStyles();

    // Use Effect to set user
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);

    // logout function
    const logout = () => {
        // Dispatch logout action from redux
        dispatch({ type: 'LOGOUT' });
        toast.success('Logout successful!');
    }

    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center"> Posts App </Typography>
                    {/* <img className={classes.image} src='' alt="" height="60" /> */}
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.user.firstname} >{user.user.firstname.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">Welcome, {user.user.firstname}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant="contained" color="primary">Access Now</Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar