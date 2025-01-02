export default [
    {
        path: "/admin/category",
        name: "admin-category",
        meta: {
            public: false,
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/category/index.vue"),
    },
    {
        path: "/admin/category/:id",
        name: "admin-category-detail",
        meta: {
            public: false,
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/category/edit.vue"),
    },
];
