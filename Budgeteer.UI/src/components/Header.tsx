import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

import { LanguageDropdown } from './LanguageDropdown';
import NavMenu from './Menu';
import { RootStore } from '../store/types/RootStore';

export const Header: FC = () => {
    const user = useSelector((state: RootStore) => state.user);
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {user?.isAuthenticated && (
                        <React.Fragment>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                NetRom - Boilerplate
                            </Typography>
                            <NavMenu />
                            <LanguageDropdown />
                        </React.Fragment>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
