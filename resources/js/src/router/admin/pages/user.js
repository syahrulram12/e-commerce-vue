export default [
    {
        path: "/admin/user",
        name: "admin-user",
        meta: {
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/user/index.vue"),
    },
    {
        path: "/admin/user/:id",
        name: "admin-user-detail",
        meta: {
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/user/edit.vue"),
    },
];
