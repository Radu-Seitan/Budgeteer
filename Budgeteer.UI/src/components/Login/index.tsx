import { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import { getUser } from '../../store/user/reducer';
import { RootStore } from '../../store/types/RootStore';

import './Login.scss';

import * as images from '../shared/resources/images';

const { LogoImage } = images.default;

export const Login: FC = () => {
    const dispatch = useDispatch();
    const [showFailed, setShowFailed] = useState(false);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .min(5, 'Enter a minimum of 5 characters')
                .required('Email is required'),
            password: yup
                .string()
                .min(8, 'Enter a minimum of 8 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            dispatch(getUser(values));
        },
    });

    const user = useSelector((state: RootStore) => state.user);
    useEffect(() => {
        if (!user.loginError) {
            setShowFailed(false);
            if (user.isAuthenticated) {
                navigate('/');
            }
        }

        if (user.email && user.loginError) {
            setShowFailed(true);
        }
    }, [user]);

    return (
        <>
            <Box
                component="form"
                className={'login-form'}
                onSubmit={formik.handleSubmit}
            >
                <img src={LogoImage} className={'login-logo-image'} />
                <TextField
                    color="primary"
                    name="email"
                    label="Email"
                    variant="filled"
                    fullWidth
                    className="field"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle
                                    color={
                                        Boolean(formik.errors.email)
                                            ? 'error'
                                            : 'action'
                                    }
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    variant="filled"
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

                <Box textAlign="center">
                    <Button
                        name="submit"
                        color="primary"
                        variant="contained"
                        type="submit"
                        className={'login-button'}
                    >
                        Login
                    </Button>
                </Box>

                <Typography hidden={!showFailed} color={'red'}>
                    Incorrect email or password
                </Typography>

                <Typography textAlign="center" mt={2}>
                    Don't have an account?{' '}
                    <Link to="/register">Register here</Link>
                </Typography>
            </Box>
        </>
    );
};
