import axios from 'axios';

const { API_URL } = process.env;

const defaultHeaders = {
    'Content-Type': 'application/json',
};

export const BaseApiClient = axios.create({
    baseURL: API_URL,
    headers: defaultHeaders,
});
