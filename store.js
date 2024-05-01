import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import restaurantReducer from "./slices/restaurantSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant : restaurantReducer,
    user: userReducer,
  },
});
