import { createSlice } from "@reduxjs/toolkit";

const initialState={
    logedIn:false
}
const LoginSlice=createSlice({

    name:"login",
    initialState,
    reducers:{
        handleLoginOn(state){
            state.logedIn=true
        },
        handleLoginOff(state){
            state.logedIn=false
        }
    }
})
export const {handleLoginOn,handleLoginOff}=LoginSlice.actions
export default LoginSlice.reducer