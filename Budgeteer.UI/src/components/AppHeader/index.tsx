import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store/types/RootStore';

import './AppHeader.scss';
import { NavMenu } from '../NavMenu';

export const AppHeader: FC = () => {
    const user = useSelector((state: RootStore) => state.user);

    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters className={'menu-container'}>
                    {user.isAuthenticated && (
                        <>
                            <Button variant="contained" component={Link} to="/">
                                <Typography className={'menu-button-text'}>
                                    Home
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/categories"
                            >
                                <Typography className={'menu-button-text'}>
                                    Categories
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/stores"
                            >
                                <Typography className={'menu-button-text'}>
                                    Stores
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/products"
                            >
                                <Typography className={'menu-button-text'}>
                                    Products
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/upload-receipt"
                            >
                                <Typography className={'menu-button-text'}>
                                    Upload receipt
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/incomes"
                            >
                                <Typography className={'menu-button-text'}>
                                    Incomes
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/expenses"
                            >
                                <Typography className={'menu-button-text'}>
                                    Expenses
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/statistics"
                            >
                                <Typography className={'menu-button-text'}>
                                    Statistics
                                </Typography>
                            </Button>
                            <NavMenu />
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
