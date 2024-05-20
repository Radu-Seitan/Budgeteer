import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Menu,
    Tooltip,
    MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuEntry, settingsItems } from './menuItems';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../store/user/reducer';

import './NavMenu.scss';

export const NavMenu = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [anchorElSettings, setAnchorElSettings] =
        useState<null | HTMLElement>(null);

    const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSettings(event.currentTarget);
    };

    const handleCloseSettingsMenu = () => {
        setAnchorElSettings(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        setAnchorElSettings(null);
    };

    const renderMenuEntries = (
        menuItems: MenuEntry[],
        handleCloseMenu: () => void
    ) =>
        menuItems.map((menuItem) => {
            return (
                <MenuItem
                    component={Link}
                    to={menuItem.route}
                    key={menuItem.key}
                    onClick={handleCloseMenu}
                >
                    <Typography textAlign="center">
                        {t(menuItem.title)}
                    </Typography>
                </MenuItem>
            );
        });
    return (
        <>
            <Box className={'nav-menu-container'}>
                <Tooltip title={t('openSettings') ?? 'Open settings'}>
                    <IconButton
                        onClick={handleOpenSettingsMenu}
                        className={'menu-icon-container'}
                    >
                        <MenuIcon fontSize="large" className={'menu-icon'} />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorElSettings}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    disableScrollLock={true}
                    open={Boolean(anchorElSettings)}
                    onClose={handleCloseSettingsMenu}
                >
                    {renderMenuEntries(settingsItems, handleCloseSettingsMenu)}
                    <MenuItem key="logout" onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
};
