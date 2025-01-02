<template>
  <div>
    <section v-if="!loading" class="product-detail-section position-relative z-1">
      <div class="jumbotron d-flex rounded-0 h-full" style="flex-direction: column">
        <div class="overlay"></div>
        <img
          src="http://127.0.0.1:8000/images/product_jumbotron.png"
          alt="E-commerce Store"
          class=""
          height="100%"
          width="100%"
        />
        <div class="jumbotron-content">
          <h1 class="text-left my-0 p-0">
            {{ cart?.customer_name ?? "Unknown Customer" }}
          </h1>
          <b-breadcrumb class="bg-transparent p-0 my-2" v-if="$route.meta.breadcrumb">
            <b-breadcrumb-item
              v-for="breadCrumb in $route.meta.breadcrumb"
              class="text-white"
              :key="breadCrumb.text"
              :to="{ route: breadCrumb.route }"
              >{{ breadCrumb.text }}</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>
      </div>
    </section>
    <b-container>
      <b-row>
        <b-col>
          <h1>Shopping Cart</h1>
          <b-table striped hover :items="cartItems" :fields="fields">
            <template #cell(actions)="data">
              <b-button variant="danger" @click="removeItem(data.item)">Remove</b-button>
            </template>
          </b-table>
          <b-row class="mt-3">
            <b-col>
              <h4>Total: {{ cart.total_price ?? 0 }}</h4>
            </b-col>
            <b-col class="text-right">
              <b-button variant="success" @click="checkout">Checkout</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getList } from "@/services/api/cart";
export default {
  data() {
    const cart = {};
    const cartItems = [];
    getList({ params: { customer_id: 1 } })
      .then((response) => {
        this.cart = response.data;
        this.cartItems = response.data.items;
        console.log(this.cartItems);
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });

    return {
      cart,
      cartItems,
      fields: [
        { key: "name", label: "Product Name" },
        { key: "price_per_unit", label: "Price" },
        { key: "quantity", label: "Quantity" },
        { key: "sub_total", label: "Sub Total" },
        { key: "actions", label: "Actions" },
      ],
      loading: true,
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    checkout() {
      // Implement checkout logic here
      alert("Proceeding to checkout");
    },
    removeFromCart(id) {},
  },
};
</script>
<style scoped>
.carts-page {
  padding: 20px;
}

.product-detail-section {
  padding: 20px;
  min-height: 300px !important;
  height: 200px !important;
  text-align: center;
}

.cart-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.total {
  font-weight: bold;
  margin-top: 20px;
}

.product-detail-section .jumbotron h1 {
  text-shadow: none;
  color: black;
}
</style>
