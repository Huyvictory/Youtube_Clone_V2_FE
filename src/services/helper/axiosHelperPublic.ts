import Axios, { AxiosError } from 'axios';

const axiosHelperPublic = Axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

const baseHeader = {
  // base header here
};

axiosHelperPublic.interceptors.request.use((config) => {
  config.headers = config.headers || baseHeader;

  return config;
});

axiosHelperPublic.interceptors.response.use(
  (res) => {
    // TODO: preprocess response data

    return res.data;
  },
  (error: AxiosError) => {
    // TODO: handle error cases. ie clean auth state if status code is 401

    return Promise.reject(error);
  },
);

export default axiosHelperPublic;
