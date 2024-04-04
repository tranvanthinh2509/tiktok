import axios from 'axios';

export const getAllVideo = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/video/getAll`);
    return res.data;
};
