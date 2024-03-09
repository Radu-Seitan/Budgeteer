// @ts-nocheck
import { all, fork } from 'redux-saga/effects';

import { ordersSagas } from './order/sagas';
import { userSagas } from './user/sagas';

export const sagas = [userSagas, ordersSagas];

export default function* rootSaga() {
    yield all(sagas.map((saga) => fork(saga, sagas)));
}
