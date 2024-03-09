import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/reducer';
import orderReducer from './order/reducer';
import rootSaga from './sagas';

const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: ['username', 'password'],
};

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    orders: orderReducer,
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
            thunk: false,
        }),
        sagaMiddleware,
    ],
});

sagaMiddleware.run(rootSaga);

export default store;
