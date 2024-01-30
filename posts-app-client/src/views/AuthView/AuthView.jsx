import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signIn, signUp } from '../../redux/actions/auth/auth.actions';
import Input from '../../components/Input/Input';
import useStyles from './AuthView.styles';
import { toast } from 'react-toastify';

let initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const AuthView = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        //setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    useEffect(() => {
        if (!isSignup) {
            initialState = { email: '', password: '' };
        } else {
            initialState = { username: '', email: '', password: '', confirmPassword: '' };
        }

        setForm(initialState);
    }, [isSignup])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);

        if (isSignup) {
            dispatch(signUp(form));
            toast.success('Sign up successful!');
            setIsSignup(false);
        } else {
            dispatch(signIn(form));
            toast.success('Sign in successful!');
            navigate('/');

            // Reload the window after 1/2 second
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    {/* FORM LOGO */}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* SHOW ONLY ON SIGN UP */}
                            {isSignup && (
                                <>
                                    {/* USERNAME INPUT */}
                                    <Input name="username" label="Username" handleChange={handleChange} autoFocus half value={form.username} />
                                </>
                            )}
                            {/* EMAIL INPUT */}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" value={form.email} />
                            {/* PASSWORD INPUT */}
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} value={form.password} />
                            {/* CONFIRM PASSWORD - ONLY ON SIGN UP */}
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" value={form.confirmPassword} />}
                        </Grid>
                        {/* SUBMIT BUTTON */}
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        {/* SWITCH BETWEEN SIGN UP/IN */}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
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