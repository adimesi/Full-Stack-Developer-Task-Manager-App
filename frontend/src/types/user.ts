export type User = {
    id: number;
    email: string;
    password: string;
    username: string;
}
export type LoginCredentials = {
    email: string;
    password: string;
}
export type SignupCredentials = {
    email: string;
    username: string;
    password: string;
}
export type AuthResponse = {
    user: User;
    token: string;
}