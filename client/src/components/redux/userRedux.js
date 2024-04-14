import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: JSON.parse(localStorage.getItem("user")) || null,
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
        },
        loginSuccess:(state, action)=>{
            state.isFetching=false;
            state.currentUser=action.payload
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        }

    }
})

export const {loginSuccess, loginStart, loginFailure} = userSlice.actions;
export default userSlice.reducer;