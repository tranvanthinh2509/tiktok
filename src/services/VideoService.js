import axios from 'axios';
import { axiosJWT } from './UserService';

export const getAllVideo = async (limit, page, title) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/video/getAll?limit=${limit}&page=${page}&title=${title}`,
    );
    return res.data;
};

export const createVideo = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/video/create`, data);
    console.log('data ', data);
    return res.data;
};

export const getDetailVideo = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/video/detail/${id}`);

    return res.data;
};

export const updateVideo = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/video/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteVideo = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/video/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const likeVideo = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/video/like/${id}`, data);
    return res;
};

export const getFollowingVideo = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/video/recent`, data);
    return res.data;
};
export const getARecentVideo = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/video/a_recent/`, data);
    return res.data;
};
export const getVideoOfMe = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/video/videoOfMe/${id}`);
    return res.data;
};

export const addCmt = async (id, type, idCmt) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/video/comment?id=${id}&type=${type}&idCmt=${idCmt}`);
    return res;
};
