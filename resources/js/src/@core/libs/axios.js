import Vue from "vue";

const apiConfig = {
    headers: { Accept: "application/json" },
    withCredentials: true,
};

const webConfig = {
    headers: { Accept: "application/json" },
    withCredentials: true,
};

const axiosApiIns = axios.create(apiConfig);
const axiosWebIns = axios.create(webConfig);

Vue.prototype.$apiHttp = axiosApiIns;
Vue.prototype.$webHttp = axiosWebIns;

export { axiosApiIns, axiosWebIns };
