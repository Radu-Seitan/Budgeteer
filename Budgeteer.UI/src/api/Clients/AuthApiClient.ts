import { BaseApiClient } from '../Base/BaseApiClient';
import { AuthResponseModel } from '../Models/AuthResponseModel';

export const AuthApiClient = {
    urlPath: 'auth',

    register(email: string, password: string): Promise<AuthResponseModel> {
        return BaseApiClient.post(this.urlPath + '/register', {
            email: email,
            password: password,
        }).then((response) => response.data);
    },

    login(email: string, password: string): Promise<AuthResponseModel> {
        return BaseApiClient.post(this.urlPath + '/login', {
            email: email,
            password: password,
        }).then((response) => response.data);
    },
};
