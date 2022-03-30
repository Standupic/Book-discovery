import Axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getStorageValue, STORAGE_KEYS } from '../services/localStorage';
import { Token } from '../types/common';
import config from './config';

const axios = Axios.create({
  baseURL: config.host + config.prefix,
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config && config.headers) {
    config.headers.Authorization = `Bearer ${getStorageValue<Token>(STORAGE_KEYS.token)?.token}`;
  }
  return config;
});

export default axios;
