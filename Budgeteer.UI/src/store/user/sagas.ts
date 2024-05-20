import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import { setUser, getUser, setLoginError } from './reducer';
import API from '../../api';
import { ResponseGenerator } from '../types/User';
import { SagaIterator } from 'redux-saga';

export function* handleGetUser(action: any): SagaIterator<void> {
    try {
        yield put(setLoginError(false));
        const { email, password } = action.payload;
        const response: ResponseGenerator = yield call(() =>
            requestGetUser(email, password)
        );
        if (response) {
            yield put(setUser({ ...response }));
        }
    } catch (error) {
        yield put(setLoginError(true));
        console.log(error);
    }
}

export function requestGetUser(email: string, password: string) {
    return API.post(
        'auth/login',
        {
            email: email,
            password: password,
        },
        { redirectWhenUnauthorized: false }
    );
}

export function* userSagas() {
    yield takeLatest(getUser.type, handleGetUser);
}
