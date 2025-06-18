// axios-config.ts
import axios from 'axios';
import { token } from './token';
 // corregí el path según dónde esté tu clase

// Interceptor para agregar el token en cada request
axios.interceptors.request.use(
  (config) => {
    const authToken = token.getToken();
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para capturar y guardar el token actualizado si el backend lo envía
axios.interceptors.response.use(
  (response) => {
    const refreshedToken = response.headers['refresh-token'];
    if (refreshedToken) {
      token.setToken(refreshedToken);
    }
    return response;
  },
  (error) => Promise.reject(error)
);