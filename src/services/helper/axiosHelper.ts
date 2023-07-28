import 'react-toastify/dist/ReactToastify.css';

import Axios, { AxiosError } from 'axios';

import { AUTH_TOKEN, ExceptionCodes } from '@/constants/index';
import { getLocalStorageKey } from '@/utils/localStorage';
import { showNotification } from '@/utils/notification';

const axiosHelper = Axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

const baseHeader = {
  // base header here
};

axiosHelper.interceptors.request.use((config) => {
  config.headers = config.headers || baseHeader;

  const token = getLocalStorageKey(AUTH_TOKEN.AUTH_TOKEN);
  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

axiosHelper.interceptors.response.use(
  (res) => {
    // TODO: preprocess response data
    return res;
  },
  (error) => {
    const status = error.response?.status;

    console.log(error);

    switch (status) {
      case ExceptionCodes.UNAUTHORIZED:
        showNotification(error.response?.data.message, 'error');

        break;
      default: {
        showNotification(error.response?.data.message, 'error');

        break;
      }
    }

    return Promise.reject(error.response?.data);
  },
);

export default axiosHelper;
