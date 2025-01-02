import httpService from "@core/libs/network-service";
const loginPath = "/api/login";
const registerPath = "/api/register";

export const login = (...args) => {
    return httpService.getHttp().post(loginPath, ...args);
};

export const register = (...args) => {
    return httpService.getHttp().post(registerPath, ...args);
};
