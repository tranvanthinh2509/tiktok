import { configureStore } from '@reduxjs/toolkit';
import searchUserSlide from './slides/searchUserSlide';
import userReducer from './slides/userSlide';

export const store = configureStore({
    reducer: { search: searchUserSlide, user: userReducer },
});
