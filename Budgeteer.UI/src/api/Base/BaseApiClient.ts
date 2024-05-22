import axios from 'axios';
import {
    AuthorizationRequestInterceptor,
    AuthorizationResponseInterceptor,
} from './interceptors';

const { API_URL } = process.env;

const defaultHeaders = {
    'Content-Type': 'application/json',
};

export const BaseApiClient = axios.create({
    baseURL: API_URL,
    headers: defaultHeaders,
});

AuthorizationRequestInterceptor.use(BaseApiClient);

AuthorizationResponseInterceptor.use(BaseApiClient);
