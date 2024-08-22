import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: null,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state, action)=>{
            state.currentUser= null;
            state.isFetching=false;
            state.error=action.payload;
        },
        googleLoginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = {
                ...action.payload,
                displayName: action.payload.displayName || action.payload.name
            };
        }

    }
})

export const {loginSuccess, loginStart, loginFailure, googleLoginSuccess} = userSlice.actions;
export default userSlice.reducer;