import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";

export const Store=configureStore({
    reducer:{
        login: LoginSlice
    }
})