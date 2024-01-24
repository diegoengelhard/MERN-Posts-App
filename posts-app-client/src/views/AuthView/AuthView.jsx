import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import Input component
import Input from '../../components/Input/Input';

// Import Google Login component
import { GoogleLogin } from 'react-google-login'; // 3h 16m

// Import styles
import useStyles from './AuthView.styles';
import GoogleIcon from '../../components/GoogleIcon/GoogleIcon';

// Import MUI components
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const AuthView = () => {
    // Set states
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    // Set styles
    const classes = useStyles();

    // Show password
    const handleShowPassword = () => setShowPassword(!showPassword);

    // Form Handle submit
    const handleSubmit = () => {

    }

    // Form Handle Input Change
    const handleInputChange = () => {

    }

    // Switch Between Sign In and Sign Up
    const switchMode = () => {
        setIsSignUp(!isSignUp);
        setShowPassword(false);
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        {/* LOGO */}
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        {/* TITLE */}
                        <Typography component="h1" variant="h5">{isSignUp ? 'Sign up' : 'Sign in'}</Typography>

                        {/* FORM */}
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {isSignUp && (
                                    <>
                                        {/* INPUT FIRST & LASTNAME ONLY ON SIGN UP */}
                                        <Input name="firstName" label="First Name" handleChange={handleInputChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleInputChange} half />
                                    </>
                                )}
                                {/* INPUT EMAIL */}
                                <Input name="email" label="Email Address" handleChange={handleInputChange} type="email" />
                                {/* INPUT PASSWORD */}
                                <Input name="password" label="Password" handleChange={handleInputChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                {/* INPUT CONFIRM PASSWORD ONLY ON SIGN UP */}
                                {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleInputChange} type="password" />}
                            </Grid>
                            {/* SUBMIT FORM BUTTON */}
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </Button>
                            
                            {/* SWITCH BETWEEN SIGN IN AND SIGN UP */}
                            <Grid container justifyContent='center'>
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
        </>
    )
}

export default AuthView