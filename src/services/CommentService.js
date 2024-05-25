import axios from 'axios';

export const getComment = async (vid) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/comment/getComments/${vid}`);
    return res.data;
};

export const createComment = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/comment/create`, data);
    return res.data;
};

export const deleteComment = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/comment/deleteComment/${id}`);
    return res.data;
};

export const updateComment = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/comment/updateComment/${id}`, data);
    return res.data;
};
