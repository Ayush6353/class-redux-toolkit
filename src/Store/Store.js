import { configureStore } from "@reduxjs/toolkit";
import SliceData from "./SliceData";

const Store = configureStore ({
    reducer:{
        users: SliceData,
    },
});

export default Store;