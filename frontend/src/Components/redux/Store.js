import { configureStore,combineReducers } from "@reduxjs/toolkit";

const rootReducer=combineReducers();

const Store=configureStore({
    reducer:rootReducer,

})

export default Store