export default [
    {
        path: "/login",
        name: "login",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/auth/login.vue"),
    },
    {
        path: "/admin/login",
        name: "admin-login",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/auth/adminLogin.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/auth/register.vue"),
    },
];
