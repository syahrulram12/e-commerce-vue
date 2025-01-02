import httpService from "@core/libs/network-service";

const resourcePath = "/api/product";

export const getList = (...args) => {
    return httpService.getHttp().get(resourcePath, ...args);
};

export const postData = (...args) => {
    return httpService.getHttp().post(resourcePath, ...args);
};

export const getDetail = (id) => {
    return httpService.getHttp().get(`${resourcePath}/${id}`);
};

export const deleteData = (id) => {
    return httpService.getHttp().delete(`${resourcePath}/${id}`);
};
