import { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { AccountCircle, Lock, Person } from '@mui/icons-material';
import { setUser } from '../../store/user/reducer'; 
import { RootStore } from '../../store/types/RootStore';

import './Register.scss';

import * as images from '../shared/resources/images';

const { LogoImage } = images.default;

export const Register: FC = () => {
    const dispatch = useDispatch();
    const [showFailed, setShowFailed] = useState(false);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .min(2, 'Enter a minimum of 2 characters')
                .required('Name is required'),
            email: yup
                .string()
                .email('Enter a valid email')
                .min(5, 'Enter a minimum of 5 characters')
                .required('Email is required'),
            password: yup
                .string()
                .min(8, 'Enter a minimum of 8 characters')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/\d/, 'Password must contain at least one digit')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            dispatch(setUser(values));
        },
    });

    const user = useSelector((state: RootStore) => state.user);
    // useEffect(() => {
    //     if (!user.registrationError) {
    //         setShowFailed(false);
    //         if (user.isAuthenticated) {
    //             navigate('/');
    //         }
    //     }

    //     if (user.email && user.registrationError) {
    //         setShowFailed(true);
    //     }
    // }, [user]);

    return (
        <>
            <Box
                component="form"
                className={'register-form'}
                onSubmit={formik.handleSubmit}
            >
                <img src={LogoImage} className={'register-logo-image'} />
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
                        className={'register-button'}
                    >
                        Register
                    </Button>
                </Box>

                <Typography hidden={!showFailed} color={'red'}>
                    Registration failed. Please try again.
                </Typography>
            </Box>
        </>
    );
};
