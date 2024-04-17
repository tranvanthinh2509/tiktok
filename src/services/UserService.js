import axios from 'axios';

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    return res.data;
};

export const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    return res.data;
};

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-detail/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true,
    });
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
    return res.data;
};

export const updateInfoUser = async (id, data, access_token) => {
    console.log('data ', data);
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const search = async (searchInput) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/search?filter=name&filter=${encodeURIComponent(searchInput)}`,
    );
    return res.data;
};

export const followUser = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/follow/${id}`, data);
    return res;
};
export const unfollowUser = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/unfollow/${id}`, data);
    return res;
};

export const followingUser = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getFollowing/${id}`);
    return res.data;
};
export const NotFollowingUser = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getNotFollowing/${id}`);
    return res.data;
};

export const getOnelUser = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getOneUser/${id}`);
    return res.data;
};
