import httpService from "@/services/api-service";
const loginPath = "/login";
const registerPath = "/register";

export const login = (...args) => {
    return httpService.getHttp().post(loginPath, ...args);
};

export const register = (...args) => {
    return httpService.getHttp().post(registerPath, ...args);
};

export const getAuthUser = () => {
    console.log(httpService.getHttp().get("/auth-user"));
};
