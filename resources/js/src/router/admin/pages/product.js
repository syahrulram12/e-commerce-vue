export default [
    {
        path: "/admin/product",
        name: "admin-product",
        meta: {
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/product/index.vue"),
    },
    {
        path: "/admin/product/:id",
        name: "admin-product-detail",
        meta: {
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/product/edit.vue"),
    },
];
