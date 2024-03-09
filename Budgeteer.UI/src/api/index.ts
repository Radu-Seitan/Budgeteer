import HttpCode from './httpStatusCodes';

export interface RequestOptions {
    redirectWhenUnauthorized?: boolean;
    headers?: any;
}

const defaultOpt: RequestOptions = {
    redirectWhenUnauthorized: true,
};

export const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'fetch',
    Authorization: '',
};

const { API_URL } = process.env;

const getUrl = (path: string) => {
    return API_URL + path;
};

const API = {
    get: <T>(path: string, options?: RequestOptions): Promise<T | null> => {
        return API.request<T | null>(path, 'GET', null, {
            ...defaultOpt,
            ...options,
        });
    },
    post: <T>(
        path: string,
        data?: object | null,
        options?: RequestOptions
    ): Promise<T | null> => {
        return API.request<T>(path, 'POST', data, {
            ...defaultOpt,
            ...options,
        });
    },
    put: <T>(
        path: string,
        data: object | null,
        options?: RequestOptions
    ): Promise<T | null> => {
        return API.request<T>(path, 'PUT', data, { ...defaultOpt, ...options });
    },
    delete: <T>(path: string, options?: RequestOptions): Promise<T | null> => {
        return API.request<T>(path, 'DELETE', null, {
            ...defaultOpt,
            ...options,
        });
    },
    request: <T>(
        path: string,
        method: string,
        data?: object | null,
        options?: RequestOptions
    ): Promise<T | null> => {
        const user = localStorage.getItem('persist:user');
        if (user) {
            const { token: token } = JSON.parse(user);
            if (token) {
                const tokenStripped = token.replace(/"/g, '');
                defaultHeaders.Authorization = `Bearer ${tokenStripped}`;
            }
        }
        return request(path, method, data, options);
    },
};

const request = <T>(
    path: string,
    method: string,
    data?: object | null,
    options?: RequestOptions
): Promise<T | null> => {
    return new Promise<T | null>((success, fail) => {
        const url = getUrl(path);
        const headers = {
            ...defaultHeaders,
            ...(options && options.headers),
        };
        const opts = {
            method,
            headers,
            body: data ? JSON.stringify(data) : null,
        };

        fetch(url, opts)
            .then((resp) => {
                if (
                    resp.status >= HttpCode.OK &&
                    resp.status < HttpCode.BAD_REQUEST
                ) {
                    if (resp.status === HttpCode.NO_CONTENT) {
                        success(null);
                    } else {
                        resp.text()
                            .then((data) => {
                                let json =
                                    data.length === 0 ? null : JSON.parse(data);
                                return success(json as T);
                            })
                            .catch((reason) => {
                                fail(reason);
                            });
                    }
                } else {
                    switch (resp.status) {
                        case HttpCode.UNAUTHORIZED:
                            if (options?.redirectWhenUnauthorized) {
                                window.location.href = '/login';
                            }
                            fail('unauthorized');
                            break;
                        default:
                            fail(`${resp.status} ${resp.statusText}`);
                    }
                }
            })
            .catch((reason) => {
                fail(reason);
            });
    });
};

export default API;
