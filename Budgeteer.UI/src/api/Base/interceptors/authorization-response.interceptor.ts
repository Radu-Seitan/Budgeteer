import { AxiosInstance } from 'axios';
import { signOutAndRedirect } from '../../../auth/auth.util';
import HttpStatusCode from '../HttpStatusCodes';

const authorizationResponseInterceptor = {
    use: (client: AxiosInstance) => {
        return client.interceptors.response.use(
            async (response) => {
                if (response.status === HttpStatusCode.UNAUTHORIZED) {
                    await signOutAndRedirect();
                }
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    },
};

export default Object.freeze(authorizationResponseInterceptor);
