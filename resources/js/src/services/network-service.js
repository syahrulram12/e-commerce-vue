import { axiosWebIns } from "../@core/libs/axios";
const csrfCookiePath = "/sanctum/csrf-cookie";
import { authAdmin } from "@/auth/utils";
export default new (class {
    axiosIns = null;
    user = null;
    constructor() {
        this.axiosIns = axiosWebIns;

        this.axiosIns.interceptors.response.use(
            (response) => response,
            (error) => {
                const { config, response } = error;
                const originalRequest = config;

                if (response && response.status === 419) {
                    return new Promise((resolve) => {
                        this.refreshCookieSession()
                            .then((success) => {
                                resolve(this.axiosIns(originalRequest));
                            })
                            .catch((error) => {
                                return Promise.reject(error);
                            });
                    });
                }

                if (response && response.status === 404) {
                    window.location.href = "/not-found";
                }

                if (response && response.status === 401) {
                    localStorage.removeItem(authAdmin);
                    window.location.href = "/login";
                }

                return Promise.reject(error);
            }
        );
    }

    login(...args) {
        return this.axiosIns.post("/login", ...args);
    }

    logout(...args) {
        return this.axiosIns.get("/logout", ...args);
    }

    getHttp() {
        return this.axiosIns;
    }

    refreshCookieSession(...args) {
        return this.axiosIns.get(csrfCookiePath, ...args);
    }
})();
