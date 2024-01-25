import React from 'react';
import { Link } from 'react-router-dom';

// Import MUI components
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

// Import toast
import { toast } from 'react-toastify';

// Import styles
import useStyles from './Navbar.styles';

const Navbar = () => {
    // Set styles
    const classes = useStyles();

    // Set user (temporary)
    const user = null;

    // logout function
    const logout = () => {
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
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar