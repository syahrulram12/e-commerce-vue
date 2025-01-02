import router from "@/router";

export const defineLayout = () => {
    const currentRoute = router.currentRoute;
    if (currentRoute.meta && currentRoute.meta.layout) {
        return currentRoute.meta.layout + "-layout";
    }

    return 'default-layout';
};
