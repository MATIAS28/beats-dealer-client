import { configureStore } from "@reduxjs/toolkit";

import beatPlayerSlice from "./slices/beatPlayer";
import userSlice from "./slices/user";
import cartSlice from "./slices/cart";

const store = configureStore({
    reducer:{
        beatPlayer: beatPlayerSlice,
        user: userSlice,
        cart: cartSlice
    }
})

export default store