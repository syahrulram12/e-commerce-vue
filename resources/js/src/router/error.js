export default [
    {
        path: "/not-found",
        name: "not-found",
        component: () => import("@/views/errors/Error404.vue"),
    },
];
