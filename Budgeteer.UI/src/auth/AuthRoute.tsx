import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootStore } from '../store/types/RootStore';

export const AuthRoute = (props: any) => {
    const user = useSelector((state: RootStore) => state.user);
    return user.isAuthenticated ? (
        <>{props.children}</>
    ) : (
        <Navigate replace to="/login" />
    );
};
