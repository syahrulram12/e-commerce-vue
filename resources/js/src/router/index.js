import Vue from "vue";

import VueRouter from "vue-router";
import userRoute from "./user";
import adminRoute from "./admin";
import { isAdminLogin } from "@/auth/utils";

import error from "./error";
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
    // console.log(to);

    if (to.meta.user === "admin") {
        const isAdminLogin = isAdminLogin();
    }
    // const isLoggedIn = isUserLogin();
    // if (to.meta.public) return next();

    // if (!isLoggedIn && to.name != "login") {
    //     return next({ name: "login" });
    // }

    // if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    //     next(getHomeRouteForLoggedInUser);
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
