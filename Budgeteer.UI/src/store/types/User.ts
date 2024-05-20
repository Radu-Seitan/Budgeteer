export interface ResponseGenerator {
    id?: string;
    token?: string;
}

export interface UserData extends ResponseGenerator {
    isAuthenticated: boolean;
    loginError: boolean;
    email: string;
    password: string;
}
