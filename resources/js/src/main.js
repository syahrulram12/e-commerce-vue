import "../bootstrap";
import Vue from "vue";
import App from "@/views/pages/App.vue";
import VueSweetalert2 from "vue-sweetalert2";

// Router
import router from "@/router";

// Global Components
import "./global-components";

//Libs
import "@core/libs/axios";
import "@core/libs/toastification";
import "@core/libs/sweetalert2";

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require("@core/assets/fonts/feather/iconfont.css"); // For form-wizard
require("@resources//sass/style.scss");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap-vue/dist/bootstrap-vue.css");

// Plugins
import { BootstrapVue, ModalPlugin } from "bootstrap-vue";
Vue.use(VueSweetalert2);
Vue.use(ModalPlugin);
Vue.use(BootstrapVue);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
