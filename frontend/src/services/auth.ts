import api from "./api";
import { User } from "../types/user";
import { LoginCredentials,SignupCredentials,AuthResponse } from "../types/user";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/login",credentials);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
};

export const signup = async (credentials: SignupCredentials): Promise<void> => {
    const response = await api.post("/signup",credentials);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};


export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    if (user) {
        try {
            return JSON.parse(user) as User;
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            return null;
        }
    }
    return null;
};