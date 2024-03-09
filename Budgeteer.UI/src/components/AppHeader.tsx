import { FC } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

import { LanguageDropdown } from './LanguageDropdown';
import NavMenu from './Menu';

export const AppHeader: FC = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
};
