<template>
  <div v-if="!loading" class="position-relative h-full">
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
          <h1 class="text-left my-0 p-0">Order Page</h1>
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
    <section>
      <b-container fluid class="my-2">
        <b-row class="my-auto">
          <b-col cols="12" class="py-2" v-for="order in orders" :key="order.id">
            <b-card
              img-alt="Product image"
              img-top
              class="shadow-sm mouse-pointer"
              @click="goToProduct(order.order_number)"
            >
              <b-row>
                <b-col cols="12" md="6" class="mb-2 position-relative">
                  <p class="m-0gi">
                    <b>Order Number : {{ order.order_number }}</b>
                    <br />
                    {{ order.created_at }}<br />
                  </p>
                  <b-badge
                    class="ml-2 px-3 py-1 position-absolute"
                    style="bottom: 0; left: 0"
                    :variant="statusVariant(order.status ?? 'PENDING')"
                  >
                    <h6 class="font-weight-bold">
                      {{ order.status ?? "PENDING" }}
                    </h6>
                  </b-badge>
                </b-col>
                <b-col cols="12" md="6" class="mb-2">
                  <b-row>
                    <b-col cols="6">Sub Total</b-col>
                    <b-col cols="6">{{ order?.sub_total?.toLocaleString() }}</b-col>
                    <b-col cols="6">Total Tax 11%</b-col>
                    <b-col cols="6">{{ order?.total_tax?.toLocaleString() }}</b-col>
                    <b-col cols="6">Total Price</b-col>
                    <b-col cols="6">{{ order?.total_price?.toLocaleString() }}</b-col>
                    <b-col cols="12" class="pt-3">
                      <b-button block @click="checkout"> See Order Details </b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
  <section v-else class="d-flex h-full justify-content-center align-items-center">
    <b-spinner></b-spinner>
  </section>
</template>

<script>
import { getList, checkout } from "@/services/api/order";
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BCol,
  BCard,
  BContainer,
  BRow,
  BSpinner,
  BTable,
  BButton,
} from "bootstrap-vue";
export default {
  components: {
    BContainer,
    BButton,
    BRow,
    BCol,
    BSpinner,
    BTable,
    BBreadcrumb,
    BBreadcrumbItem,
  },
  data() {
    const orders = {};
    getList({ params: { customer_id: 1 } })
      .then((response) => {
        this.orders = response.data.data;
        this.page = response.data.current_page;
        this.totalOrders = response.data.total;
        this.lastPage = response.data.last_page;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
      });

    return {
      orders,
      loading: true,
      page: 1,
      totalOrders: 0,
      lastPage: 0,
      perPage: 5,
    };
  },
  computed: {
    // total() {
    //   return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // },
  },
  setup() {
    const statusVariant = (status) => {
      if (status === "PENDING") return "warning";
      if (status === "SUCCESS") return "warning";
      return "danger";
    };

    return { statusVariant };
  },
  methods: {
    fetchData() {
      getList({ params: { customer_id: 1 } })
        .then((response) => {
          if (response.data.items.length === 0) {
            this.orders = response.data.data;
            this.page = response.data.current_page;
            this.totalOrders = response.data.total;
            this.lastPage = response.data.last_page;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.$toast("Failed to fetch data", {
            title: "Error",
            variant: "danger",
            solid: true,
          });
          this.loading = false;
        });
    },
    checkout() {
      let formData = {
        order_id: this.order.id,
        order_number: "ORD_31/12/24_01",
      };
      checkoutOrder(formData)
        .then((res) => {})
        .catch((err) => {});
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

.order-item {
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
