import Vue from "vue";
import Toast, { POSITION } from "vue-toastification";

/**
 * NOTE: If you are using other transition them make sure to import it in `src/@resources/scss/vue/libs/notification.scss` from it's source
 */
Vue.use(Toast, {
    position: POSITION.TOP_CENTER,
    hideProgressBar: true,
    closeOnClick: false,
    closeButton: false,
    icon: false,
    timeout: 3000,
    transition: "Vue-Toastification__fade",
});
