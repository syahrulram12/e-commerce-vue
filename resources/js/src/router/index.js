import Vue from "vue";

import VueRouter from "vue-router";
import userRoute from "./user";
import adminRoute from "./admin";
import { isAdminLogin } from "@/auth/utils";

import error from "./error";
import { getAuthUser } from "../auth/utils";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "*",
            redirect: "not-found",
        },
        ...userRoute,
        ...adminRoute,
        ...error,
    ],
});

router.beforeEach((to, _, next) => {
    const isLoggedIn = getAuthUser();
    if (!isLoggedIn && to.meta.public === false) {
        return next({ name: "login" });
    }

    // if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    //     next({ name: "admin-dashboard" });
    // }
    return next();
});

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById("loading-bg");
    if (appLoading) {
        appLoading.style.display = "none";
    }
});

export default router;
