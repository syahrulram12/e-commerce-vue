import httpService from "@/services/api-service";

const resourcePath = "/api/order";

export const getList = (...args) => {
    return httpService.getHttp().get(resourcePath, ...args);
};

export const postData = (...args) => {
    return httpService.getHttp().post(resourcePath, ...args);
};

export const getDetail = (slug) => {
    return httpService.getHttp().get(`${resourcePath}/${slug}`);
};

export const deleteData = (id) => {
    return httpService.getHttp().delete(`${resourcePath}/${id}`);
};
