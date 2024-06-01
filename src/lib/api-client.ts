import { API_ROUTES, STORAGE } from '@/constants';
import axios from 'axios';
import { ENV_CONFIG } from './env-config';

export const apiClient = axios.create({
  baseURL: ENV_CONFIG.API_URL,
  timeout: 30000,
  withCredentials: true,
});

export const apiUploadClient = axios.create({
  baseURL: ENV_CONFIG.UPLOAD_URL,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem(STORAGE.ACCESS_TOKEN);

    console.log('accessToken', accessToken);

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    console.log('error', error);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN);
      if (response.status === 200) {
        localStorage.setItem(
          STORAGE.ACCESS_TOKEN,
          response.data.data.access_token,
        );
        localStorage.setItem(
          STORAGE.REFRESH_TOKEN,
          response.data.data.refresh_token,
        );
        originalRequest.headers.Authorization = `Bearer ${response.data.data.access_token}`;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
