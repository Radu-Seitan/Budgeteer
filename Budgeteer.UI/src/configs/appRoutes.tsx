import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from '../auth/AuthRoute';
import App from '../App';
import { Login } from '../components/Login';
import { Home } from '../components/Home';
import { CategoriesPage } from '../components/CategoriesPage';
import { Register } from '../components/Register';
import { UploadReceipt } from '../components/UploadReceipt';
import { Statistics } from '../components/StatisticsPage';
import { StoresPage } from '../components/StoresPage';
import { IncomesPage } from '../components/IncomesPage';
import { ExpensesPage } from '../components/ExpensesPage';
import { ProductsPage } from '../components/ProductsPage';

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
                <Route
                    path={'/categories'}
                    element={
                        <AuthRoute>
                            <CategoriesPage />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/upload-receipt'}
                    element={
                        <AuthRoute>
                            <UploadReceipt />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/statistics'}
                    element={
                        <AuthRoute>
                            <Statistics />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/stores'}
                    element={
                        <AuthRoute>
                            <StoresPage />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/incomes'}
                    element={
                        <AuthRoute>
                            <IncomesPage />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/expenses'}
                    element={
                        <AuthRoute>
                            <ExpensesPage />
                        </AuthRoute>
                    }
                />
                <Route
                    path={'/products'}
                    element={
                        <AuthRoute>
                            <ProductsPage />
                        </AuthRoute>
                    }
                />
            </Route>
        </Routes>
    );
};
