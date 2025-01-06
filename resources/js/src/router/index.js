import Vue from "vue";

import VueRouter from "vue-router";
import userRoute from "./user";
import adminRoute from "./admin";
import authRoute from "./auth";
import errorRoute from "./error";

import { getAuthUser, authAdmin, authUser, getToken } from "../auth/utils";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "*",
            redirect: "not-found",
        },
        ...authRoute,
        ...userRoute,
        ...adminRoute,
        ...errorRoute,
    ],
});

router.beforeEach((to, _, next) => {
    const adminIsLoggedIn = getAuthUser(authAdmin);
    const userIsLoggedIn = getAuthUser(authUser);
    if (
        !adminIsLoggedIn &&
        to.meta.public === false &&
        to.meta.layout === "admin"
    ) {
        return next({ name: "admin-login" });
    }

    if (
        !userIsLoggedIn &&
        to.meta.public === false &&
        to.meta.layout === "user"
    ) {
        return next({ name: "login" });
    }

    if (adminIsLoggedIn && to.name == "admin-login") {
        next({ name: "admin-dashboard" });
    }
    if (userIsLoggedIn && to.name == "login") {
        console.log('test')
        next({ name: "home" });
    }

    console.log(userIsLoggedIn);
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
