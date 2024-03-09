import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, Login, OrdersOverview, About } from '../components';
import { AuthRoute } from '../auth/AuthRoute';
import App from '../App';

export const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<App />}>
                <Route path={'/login'} element={<Login />} />
                <Route
                    path={'/'}
                    element={
                        <AuthRoute>
                            <Home />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/about'}
                    element={
                        <AuthRoute>
                            <About />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/orders'}
                    element={
                        <AuthRoute>
                            <OrdersOverview />
                        </AuthRoute>
                    }
                />
            </Route>
        </Routes>
    );
};
