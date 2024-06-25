import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: {
            allOrder: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        getOrdersStart: (state) => {
            state.orders.isFetching=true;
        },
        getOrdersSuccess: (state, action) => {
            state.orders.allOrder = action.payload;
            state.orders.isFetching = false;
        },
        getOrdersFailed: (state, action) => {
            state.orders.error = true;
            state.orders.isFetching=false;
            state.msg = action.payload;
        },
        delOrdersStart: (state) => {
            state.orders.isFetching=true;
        },
        delOrdersSuccess: (state, action) => {
            state.msg = action.payload;
            state.orders.isFetching = false;
        },
        delOrdersFailed: (state, action) => {
            state.orders.error = true;
            state.orders.isFetching=false;
            state.msg = action.payload;
        }
    }
})

export const {getOrdersStart, getOrdersSuccess, getOrdersFailed ,delOrdersStart, delOrdersSuccess, delOrdersFailed } = orderSlice.actions;
export default orderSlice.reducer;