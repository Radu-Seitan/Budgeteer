import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Order } from '../types/Order';

const initialState: Order[] = []; //Should be empty in order to display noRecords in the grid
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrders() {
            //Trigger request
        },
        setOrders(state, action): Order[] {
            return action.payload as Order[];
        },
        addOrder(state, action: PayloadAction<Order>): void {
            //Trigger request
        },
        editOrder(state, action: PayloadAction<Order>): void {
            //Trigger request
        },
        addOrderCompleted(state, action) {
            state.push(action.payload);
        },
        editOrderCompleted(state, action: PayloadAction<Order>): void {
            const updatedOrder = action.payload;
            let existingOrder = state.find((el) => el.id === updatedOrder.id);
            if (existingOrder) {
                existingOrder = updatedOrder;
            }
        },
    },
});

export const {
    getOrders,
    setOrders,
    addOrder,
    addOrderCompleted,
    editOrderCompleted,
    editOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
