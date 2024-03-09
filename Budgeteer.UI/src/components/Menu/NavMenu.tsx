import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { settingsItems, pageItems } from './menuItems';
import { logout } from '../../store/user/reducer';
import { RootStore } from '../../store/types/RootStore';

export const NavMenu = () => {
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        setAnchorElUser(null);
    };

    const user = useSelector((state: RootStore) => state.user);

    return (
        <React.Fragment>
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: 'none', md: 'flex' },
                }}
            >
                {pageItems.map((page) => (
                    <MenuItem component={Link} to={page.route} key={page.key}>
                        <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                ))}
            </Box>
            <Box>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar>{user?.fullName?.charAt(0)}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settingsItems.map((setting) => (
                        <MenuItem
                            component={Link}
                            to={setting.route}
                            key={setting.key}
                        >
                            <Typography textAlign="center">
                                {setting.title}
                            </Typography>
                        </MenuItem>
                    ))}
                    <MenuItem key="logout" onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </React.Fragment>
    );
};
