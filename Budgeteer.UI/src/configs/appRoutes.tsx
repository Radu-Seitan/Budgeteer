import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from '../auth/AuthRoute';
import App from '../App';
import { Login } from '../components/Login';
import { Home } from '../components/Home';
import { Register } from '../components/Register';

export const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<App />}>
                <Route path={'/register'} element={<Register />} />
                <Route path={'/login'} element={<Login />} />
                <Route
                    path={'/'}
                    element={
                        <AuthRoute>
                            <Home />
                        </AuthRoute>
                    }
                />
            </Route>
        </Routes>
    );
};
