import { FC, useEffect } from 'react';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { ThemeProvider, createTheme } from '@mui/material';

import './App.scss';

const App: FC = () => {
    useTranslation(); // needed in order to initialize the translations for children
    useEffect(() => {
        const language = localStorage.getItem('i18nextLng');
        if (language) {
            changeLanguage(language);
        }
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#d1cd00',
            },
            secondary: {
                main: '#b5b45c',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <AppHeader />
            <Outlet />
        </ThemeProvider>
    );
};

export default App;
