<template>
  <div class="home">
    <button
      v-if="order && !order.snap_token"
      @click="postData"
      class="btn btn-success p-1"
    >
      Checkout
    </button>
    <button
      v-if="order && order.snap_token && order.status === 'PENDING'"
      class="btn btn-danger p-1"
      @click="onClickPayment(order.snap_token)"
    >
      Select Payment
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello, User!",
      order: null,
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder(id) {
      axios
        .get("/api/order/2")
        .then((res) => {
          this.order = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    postData() {
      axios
        .post("/api/order", {
          order_number: "ORD_31/12/24_01",
          items: [
            {
              product_id: 1,
              quantity: 1,
            },
            {
              product_id: 1,
              quantity: 2,
            },
            {
              product_id: 2,
              quantity: 3,
            },
            {
              product_id: 3,
              quantity: 1,
            },
          ],
        })
        .then((res) => {
          this.getOrder();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickPayment(token) {
      window.snap.pay(token, {
        // Optional
        onSuccess: function (result) {
          console.log("success");
        },
        // Optional
        onPending: function (result) {
          console.log("pending");
        },
        // Optional
        onError: function (result) {
          console.log("error");
        },
      });
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
