export default [
    {
        path: "/admin/order",
        name: "admin-order",
        meta: {
            public: false,
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/order/index.vue"),
    },
    {
        path: "/admin/order/:id",
        name: "admin-order-detail",
        meta: {
            public: false,
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/order/edit.vue"),
    },
];
