import { AxiosInstance } from 'axios';
import store from '../../../store/store';

const authorizationRequestInterceptor = {
    use: (client: AxiosInstance) => {
        return client.interceptors.request.use(
            async (request) => {
                const token = store.getState().user.token;

                request.headers!['Authorization'] = 'Bearer ' + token;
                return request;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    },
};

export default Object.freeze(authorizationRequestInterceptor);
