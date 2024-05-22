import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import { setUser, getUser, setLoginError, register } from './reducer';
import { ResponseGenerator } from '../types/User';
import { SagaIterator } from 'redux-saga';
import { AuthApiClient } from '../../api/Clients/AuthApiClient';

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

export function* handleRegister(action: any): SagaIterator<void> {
    try {
        yield put(setLoginError(false));
        const { email, password } = action.payload;
        const response: ResponseGenerator = yield call(() =>
            requestRegister(email, password)
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
    return AuthApiClient.login(email, password);
}

export function requestRegister(email: string, password: string) {
    return AuthApiClient.register(email, password);
}

export function* userSagas() {
    yield takeLatest(getUser.type, handleGetUser);
    yield takeLatest(register.type, handleRegister);
}
