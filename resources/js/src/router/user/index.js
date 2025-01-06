export default [
    {
        path: "/",
        redirect: { name: "home" },
        meta: {
            layout: "user",
        },
    },
    {
        path: "/faq",
        name: "faq",
        meta: {
            layout: "user",
        },
        component: () => import("@/views/pages/user/faq.vue"),
    },
    {
        path: "/contact",
        name: "contact",
        meta: {
            public: true,
            layout: "user",
        },
        component: () => import("@/views/pages/user/contact.vue"),
    },

    {
        name: "home",
        path: "/home",
        meta: {
            public: true,
            layout: "user",
        },
        component: () => import("@/views/pages/user/index.vue"),
    },
    // {
    //     name: "order",
    //     path: "/order",
    //     meta: {
    //         layout: "user",
    //     },
    //     component: () => import("@/views/pages/user/order/index.vue"),
    // },
    {
        name: "cart",
        path: "/cart",
        meta: {
            public: false,
            layout: "user",
        },
        component: () => import("@/views/pages/user/cart/index.vue"),
    },
    {
        name: "order",
        path: "/order",
        meta: {
            public: false,
            layout: "user",
        },
        component: () => import("@/views/pages/user/order/index.vue"),
    },
    {
        name: "order-detail",
        path: "/order/{id}",
        meta: {
            public: false,
            layout: "user",
            breadcrumb: [
                {
                    text: "Order",
                    to: "/order",
                },
                {
                    text: "Detail",
                    active: true,
                },
            ],
        },
        component: () => import("@/views/pages/user/order/detail.vue"),
    },
    {
        name: "product",
        path: "/product",
        meta: {
            layout: "user",
        },
        component: () => import("@/views/pages/user/product/index.vue"),
    },
    {
        path: "/product/:slug",
        name: "product-detail",
        meta: {
            layout: "user",
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
            layout: "user",
        },
        component: () => import("@/views/pages/user/aboutUs.vue"),
    },
    // {
    //     name: "payment-success",
    //     path: "/order/payment-success",
    //     meta: {
    //         layout: "user",
    //     },
    //     component: () => import("@/views/pages/user/order/paymentSuccess.vue"),
    // },
];
