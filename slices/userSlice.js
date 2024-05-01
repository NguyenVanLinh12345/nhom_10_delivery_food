import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    name: null,
    email: null,
    password: null,
  },
};

export const restaurantSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser  : (state ,  action) => {
        state.user  = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = restaurantSlice.actions;


export const selectUser  = (state) => state.user


export default restaurantSlice.reducer;
