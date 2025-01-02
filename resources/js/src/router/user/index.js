export default [
    {
        path: "/",
        redirect: { name: "home" },
        meta: {
            layout: "default",
        },
    },
    {
        path: "/login",
        name: "login",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/auth/login.vue"),
    },
    {
        path: "/faq",
        name: "faq",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/user/faq.vue"),
    },
    {
        path: "/contact",
        name: "contact",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/user/contact.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/auth/register.vue"),
    },
    {
        name: "home",
        path: "/home",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/user/index.vue"),
    },
    // {
    //     name: "order",
    //     path: "/order",
    //     meta: {
    //         layout: "default",
    //     },
    //     component: () => import("@/views/pages/user/order/index.vue"),
    // },
    {
        name: "cart",
        path: "/cart",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/user/carts/index.vue"),
    },
    {
        name: "product",
        path: "/product",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/user/product/index.vue"),
    },
    {
        path: "/product/:slug",
        name: "product-detail",
        meta: {
            layout: "default",
            breadcrumb: [
                {
                    text: "Product",
                    to: "/category",
                },
                {
                    text: "Detail",
                    active: true,
                },
            ],
        },
        component: () => import("@/views/pages/user/product/detail.vue"),
    },
    {
        name: "about-us",
        path: "/about-us",
        meta: {
            layout: "default",
        },
        component: () => import("@/views/pages/user/aboutUs.vue"),
    },
    // {
    //     name: "payment-success",
    //     path: "/order/payment-success",
    //     meta: {
    //         layout: "default",
    //     },
    //     component: () => import("@/views/pages/user/order/paymentSuccess.vue"),
    // },
];
