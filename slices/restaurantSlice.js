import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
  trigerRefresh: false,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {

    setRestaurant  : (state ,  action) => {
        state.restaurant  = action.payload
    },

    trigerRefresh: (state) => {
      state.trigerRefresh = !state.trigerRefresh;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant, trigerRefresh } = restaurantSlice.actions;


export const selectRestaurant  = (state) => state.restaurant.restaurant
export const selectTrigerRefresh = (state) => state.restaurant.trigerRefresh;


export default restaurantSlice.reducer;
