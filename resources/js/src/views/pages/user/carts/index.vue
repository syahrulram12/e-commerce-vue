<template>
  <div v-if="!loading && Object.keys(cartItems).length > 0">
    <section class="product-detail-section position-relative z-1">
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
          <h1 class="text-left my-0 p-0">Shopping Cart</h1>
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
    <b-container class="my-2">
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="cartItems"
            show-empty
            empty-text="Add some items to your cart first"
            :fields="fields"
          >
            <template #cell(price_per_unit)="data">
              {{ data.item.price_per_unit?.toLocaleString() ?? 0 }}
            </template>
            <template #cell(actions)="data">
              <b-button variant="danger" @click="removeFromCart(data.item.id)"
                >Remove</b-button
              >
            </template>
          </b-table>
          <b-row class="mt-3">
            <b-col>
              <span>Sub Total: Rp{{ cart.total_price?.toLocaleString() ?? 0 }}</span
              ><br />
              <span>Tax 12%: Rp{{ cart.total_tax?.toLocaleString() ?? 0 }}</span
              ><br />
              <span class="font-weight-bold"
                >Total: Rp{{ cart.total_price?.toLocaleString() ?? 0 }}</span
              >
            </b-col>
            <b-col class="text-right">
              <b-button variant="success" @click="checkout">Checkout</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
  <section v-else class="d-flex h-full justify-content-center align-items-center">
    <b-spinner></b-spinner>
  </section>
</template>

<script>
import { getList } from "@/services/api/cart";
import { deleteItem } from "@/services/api/cart";
export default {
  data() {
    const cart = {};
    const cartItems = [];
    getList({ params: { customer_id: 1 } })
      .then((response) => {
        this.cart = response.data;
        this.cartItems = response.data.items;
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
        { key: "product_name", label: "Product Name" },
        { key: "price_per_unit", label: "Price" },
        { key: "quantity", label: "Quantity" },
        { key: "total_price", label: "Sub Total" },
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
    removeFromCart(id) {
      deleteItem(id)
        .then((response) => {
          this.fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchData() {
      getList({ params: { customer_id: 1 } })
        .then((response) => {
          if (response.data.items.length === 0) {
            this.cart = response.data;
            this.cartItems = response.data.items.length > 0 ? response.data.items : [];
            this.loading = false;
          }
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    checkout() {
      axios
        .post("/api/order", {
          cart_id: this.cart.id,
          order_number: "ORD_31/12/24_01",
          items: this.cartItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
          })),
        })
        .then((res) => {
          window.snap.pay(res.data.token, {
            onSuccess: function (result) {
              this.$router.refresh();
            },
            onPending: function (result) {
              console.log("pending", result);
            },
            onError: function (result) {
              console.log("error", result);
            },
            onClose: function () {
              console.log("customer closed the popup without finishing the payment");
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
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
