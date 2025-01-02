import httpService from "@core/libs/network-service";

const resourcePath = "/api/cart";

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

export const addToCart = (...data) => {
    return httpService.getHttp().post(`${resourcePath}/add-to-cart`, ...data);
};
