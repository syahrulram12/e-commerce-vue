export default [
    {
        path: "/admin/customer",
        name: "admin-customer",
        meta: {
            public: false,
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/customer/index.vue"),
    },
    {
        path: "/admin/customer/:id",
        name: "admin-customer-detail",
        meta: {
            public: false,
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/customer/edit.vue"),
    },
];
