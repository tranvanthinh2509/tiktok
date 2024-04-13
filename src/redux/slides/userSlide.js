import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    name: '',
    email: '',
    nickName: '',
    story: '',
    avatar: '',
    followings: [],
    followers: [],
    like: '',
    access_token: '',
    isAdmin: false,
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                _id = '',
                name,
                email,
                access_token,
                nickName = '',
                story = '',
                avatar = '',
                followings = [],
                followers = [],
                like = '',
                isAdmin,
            } = action.payload;
            state.id = _id;
            state.name = name;
            state.email = email;
            state.nickName = nickName;
            state.story = story;
            state.avatar = avatar;
            state.followings = followings;
            state.followers = followers;
            state.like = like;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.nickName = '';
            state.avatar = '';
            state.story = '';
            state.followers = [];
            state.followers = [];
            state.like = '';
            state.access_token = '';
            state.isAdmin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
