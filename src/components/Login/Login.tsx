import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import useStyles from '../Login/styles';
import { UserDataToLogin } from '../../redux/modules/users/types';
import { validateEmail, validatePass } from '../../helpers/fieldValidations';
import { loginAndGetProfileRequest } from '../../redux/modules/users/actions';
import { useDispatch } from 'react-redux';

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [data, setData] = useState<UserDataToLogin>({email: '', password: ''});
    const [errors, setErrors] = useState<UserDataToLogin>({email: '', password: ''});
    const [key, setKey] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.currentTarget;
        setData((prevState) => ({...prevState, [id]: value}));
    };

    useEffect(() => {
        if (!validateEmail(data.email)) {
            setErrors((prevState => ({...prevState, email: 'Incorrect email'})));
        } else {
            setErrors((prevState => ({...prevState, email: ''})));
        }

        if (!validatePass(data.password)) {
            setErrors((prevState => ({...prevState, password: 'Minimum 8 characters'})));
        } else {
            setErrors((prevState => ({...prevState, password: ''})));
        }
    }, [data]);

    const handleLogin = useCallback(() => dispatch(loginAndGetProfileRequest(data)), [dispatch, data]);

    window.addEventListener('keypress', (e: KeyboardEvent) => {
        setKey(e.key);
    });

    useEffect(() => {
        key === 'Enter' && !errors.email && !errors.password && handleLogin();
    }, [key, errors.email, errors.password, handleLogin]);

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction='column'
            className={classes.headerWrapper}
            spacing={1}
        >
            <Grid item>
                <TextField
                    id="email"
                    label="Email"
                    variant="filled"
                    type='email'
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    FormHelperTextProps={{className: classes.helperText}}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant='filled'
                    autoComplete="current-password"
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    onChange={handleChange}
                    FormHelperTextProps={{className: classes.helperText}}
                />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    id="login-register-button"
                    color='primary'
                    disabled={Boolean(errors.email || errors.password)}
                    onClick={handleLogin}
                >
                    LOG IN / REGISTER
                </Button>
            </Grid>
        </Grid>
    );
};

export default Login;
