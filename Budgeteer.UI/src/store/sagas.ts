// @ts-nocheck
import { all, fork } from 'redux-saga/effects';
import { userSagas } from './user/sagas';

export const sagas = [userSagas];

export default function* rootSaga() {
    yield all(sagas.map((saga) => fork(saga, sagas)));
}
