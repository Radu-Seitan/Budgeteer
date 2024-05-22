import { createSlice } from '@reduxjs/toolkit';

import { UserData } from '../types/User';

const initialState: UserData = {
    token: '',
    isAuthenticated: false,
    loginError: false,
    email: '',
    password: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        getUser(state, action) {
            return { ...action.payload };
        },
        setUser(state, action) {
            const userData = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                loginError: false,
                token: userData.tk,
            };
        },
        setLoginError(state, action) {
            return {
                ...state,
                isAuthenticated: false,
                loginError: action.payload,
            };
        },
        register(state, action) {
            const userData = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                loginError: false,
                token: userData.tk,
            };
        },
        logout: () => initialState,
    },
});

export const { getUser, setUser, setLoginError, register, logout } =
    userSlice.actions;

export default userSlice.reducer;
