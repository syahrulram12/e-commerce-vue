import customer from "./pages/customer";
import order from "./pages/order";
import category from "./pages/category";
import product from "./pages/product";
import user from "./pages/user";
export default [
    {
        path: "/admin/",
        redirect: { name: "admin-dashboard" },
        meta: {
            public: false,
        },
    },
    {
        path: "/admin/dashboard",
        name: "admin-dashboard",
        meta: {
            public: false,
            layout: "admin",
        },
        component: () => import("@/views/pages/admin/dashboard/Dashboard.vue"),
    },
    ...product,
    ...category,
    ...order,
    ...customer,
    ...user,
];
