import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
};

export const searchUserSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.search = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { searchUser } = searchUserSlide.actions;

export default searchUserSlide.reducer;
