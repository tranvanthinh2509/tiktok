import axios from 'axios';
import { axiosJWT } from './UserService';

export const getAllVideo = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/video/getAll`);
    console.log('123 ', res);
    return res.data;
};

export const createVideo = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/video/create`, data);
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
