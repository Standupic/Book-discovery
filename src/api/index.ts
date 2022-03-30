import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { getStorageValue, STORAGE_KEYS } from '../services/localStorage';
import config from './config';

const axios = Axios.create({
  baseURL: config.host + config.prefix,
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

const isAuthRequest = (config: AxiosRequestConfig) => {
  return ['/auth/register', '/auth/login'].includes(config.url || '');
};

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config && config.headers && !isAuthRequest(config)) {
    config.headers.Authorization = `Bearer ${
      getStorageValue<STORAGE_KEYS.token>(STORAGE_KEYS.token)?.token
    }`;
  }
  return config;
});

// axios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     if (error.response?.status === 400) {
//       window.location.reload();
//     }
//   },
// );

export default axios;
