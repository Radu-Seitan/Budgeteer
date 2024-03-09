import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';

import API, { defaultHeaders } from '../../api';
import {
    getOrders,
    setOrders,
    addOrder,
    addOrderCompleted,
    editOrderCompleted,
    editOrder,
} from './reducer';
import { Order } from '../types/Order';

export function getOrdersRequest() {
    return API.get('Orders', {
        redirectWhenUnauthorized: false,
        headers: defaultHeaders,
    });
}

export function postOrderRequest(data: Order) {
    return API.post('Orders', data);
}

export function putOrderRequest(data: Order) {
    return API.put('Orders', data);
}

export function* ordersRequest(action: unknown): SagaIterator<void> {
    try {
        const response = yield call(getOrdersRequest);
        if (response) {
            yield put(setOrders(response as Order[]));
        }
    } catch {}
}

export function* addOrderRequest(
    action: PayloadAction<Order>
): SagaIterator<void> {
    try {
        yield call(() => postOrderRequest(action.payload));
        yield put(addOrderCompleted(action.payload));
    } catch {}
}

export function* updateOrderRequest(
    action: PayloadAction<Order>
): SagaIterator<void> {
    try {
        yield call(() => putOrderRequest(action.payload));
        yield put(editOrderCompleted(action.payload));
    } catch {}
}

export function* ordersSagas() {
    yield takeLatest(getOrders.type, ordersRequest);
    yield takeLatest(addOrder.type, addOrderRequest);
    yield takeLatest(editOrder.type, updateOrderRequest);
}
