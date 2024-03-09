export interface ResponseGenerator {
    id?: string;
    token?: string;
    fullName?: string;
}

export interface UserData extends ResponseGenerator {
    isAuthenticated: boolean;
    loginError: boolean;
    username: string;
    password: string;
}
