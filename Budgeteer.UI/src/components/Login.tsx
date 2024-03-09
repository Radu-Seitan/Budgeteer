import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

import { getUser } from '../store/user/reducer';
import { RootStore } from '../store/types/RootStore';

import './Login.scss';

export const Login: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showFailed, setShowFailed] = useState(false);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: yup.object({
            username: yup
                .string()
                .min(3, t('Enter a min of 3 chars'))
                .required(t('User required')),
            password: yup
                .string()
                .min(4, t('Enter a min of 4 chars'))
                .required(t('Password required')),
        }),
        onSubmit: (values) => {
            dispatch(getUser(values));
        },
    });

    const user = useSelector((state: RootStore) => state.user);
    useEffect(() => {
        if (!user.loginError) {
            setShowFailed(false);
            if (user.token) {
                navigate('/');
            }
        }

        if (user.username && user.password && user.loginError) {
            setShowFailed(true);
        }
    }, [user]);

    return (
        <React.Fragment>
            <Box
                component="form"
                className={'login-form'}
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    color="primary"
                    name="username"
                    label={t('user')}
                    variant="outlined"
                    fullWidth
                    className="field"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                    }
                    helperText={
                        formik.touched.username && formik.errors.username
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle
                                    color={
                                        Boolean(formik.errors.username)
                                            ? 'error'
                                            : 'action'
                                    }
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    sx={{
                        marginTop: '20px',
                    }}
                    name="password"
                    type="password"
                    label={t('password')}
                    variant="outlined"
                    fullWidth
                    className="field"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock
                                    color={
                                        Boolean(formik.errors.password)
                                            ? 'error'
                                            : 'action'
                                    }
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <br />
                <br />
                <Box textAlign="center">
                    <Button
                        sx={{
                            width: '100%',
                            marginTop: '20px',
                            height: '40px',
                            backgroundColor: '#a7ce3b',
                        }}
                        name="submit"
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        {t('login')}
                    </Button>
                </Box>
                <br />
                <Typography hidden={!showFailed} color={'red'}>
                    Incorrect username or password
                </Typography>
            </Box>
        </React.Fragment>
    );
};
