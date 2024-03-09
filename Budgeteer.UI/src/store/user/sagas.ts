import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import { setUser, getUser, setLoginError } from './reducer';
import API from '../../api';
import { ResponseGenerator } from '../types/User';
import { SagaIterator } from 'redux-saga';

export function* handleGetUser(action: any): SagaIterator<void> {
    try {
        yield put(setLoginError(false));
        const { username, password } = action.payload;
        const response: ResponseGenerator = yield call(() =>
            requestGetUser(username, password)
        );
        if (response) {
            yield put(setUser({ ...response }));
        }
    } catch (error) {
        yield put(setLoginError(true));
        console.log(error);
    }
}

export function requestGetUser(username: string, password: string) {
    return API.post(
        'Authenticate/login',
        {
            username: username,
            password: password,
        },
        { redirectWhenUnauthorized: false }
    );
}

export function* userSagas() {
    yield takeLatest(getUser.type, handleGetUser);
}
