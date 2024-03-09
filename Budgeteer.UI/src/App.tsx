import { FC, useEffect } from 'react';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';

import './App.scss';

const App: FC = () => {
    useTranslation(); // needed in order to initialize the translations for children
    useEffect(() => {
        const language = localStorage.getItem('i18nextLng');
        if (language) {
            changeLanguage(language);
        }
    }, []);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default App;
