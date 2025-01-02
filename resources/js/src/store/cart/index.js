import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
    },
    mutations: {
        ADD_TO_CART(state, product) {
            state.cart.push(product);
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter(
                (product) => product.id !== productId
            );
        },
        CLEAR_CART(state) {
            state.cart = [];
        },
    },
});
