<template>
  <div class="register-container">
    <section class="jumbotron jumbotron-section position-relative rounded-0 m-0">
      <div class="overlay"></div>
      <img
        src="http://127.0.0.1:8000/images/product_jumbotron.png"
        alt="E-commerce Store"
        class=""
        height="100%"
        width="100%"
      />
      <div class="jumbotron-content">
        <h1 class="font-weight-bolder">Welcome to Our E-commerce Store!</h1>
        <p class="jumbotron-text font-weight-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.ss
        </p>
        <button class="btn btn-secondary">Shop Now</button>
      </div>
    </section>
    <section>
      <div class="text-left bg-dark text-light p-3 section-header">
        <h2>New Product!</h2>
      </div>
      <div class="product-list bg-light d-flex text-dark m-0 overflow-hidden p-4">
        <b-row class="my-auto px-4 mx-auto">
          <b-col
            v-for="product in products"
            :key="product.id"
            cols="4"
            lg="3"
            class="mb-4"
          >
            <b-card
              img-alt="Product image"
              img-top
              class="shadow product-card mouse-pointer"
              @click="goToProduct(product.slug)"
            >
              <div class="product-img overflow-hidden">
                <b-card-img
                  :src="product.image_link"
                  alt="Image"
                  class="rounded-0 img-fluid"
                ></b-card-img>
              </div>
              <b-card-text class="text-left mt-2 overflow-auto">
                <span class="font-weight-bold text-capitalize">{{
                  product.name.slice(0, 15) + "..."
                }}</span>
                <br />
                Rp{{ product.price?.toLocaleString() }}
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
import { BCard, BCardImg, BCardText, BCol, BRow } from "bootstrap-vue";
import { getList } from "@/services/api/product";
export default {
  components: {
    BCard,
    BCardImg,
    BCardText,
    BRow,
    BCol,
  },
  data() {
    return {
      products: [
        // Add more products as needed
      ],
    };
  },
  created() {
    const slug = this.$route.params.slug;
    this.getProducts("", 5, 1, "created_at", "desc");
  },
  methods: {
    async getProducts(slug = "", perPage = 10, page = 1, sortBy, sortDesc = "desc") {
      try {
        const response = await getList({
          params: {
            perPage,
            page,
            slug,
            sortBy,
            sortDesc,
          },
        });
        this.products = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    hasSlug() {
      return this.$route.params.slug ? true : false;
    },
    goToProduct(slug) {
      this.$router.push({ name: "product-detail", params: { slug: slug } });
    },
  },
};
</script>

<style scoped>
.register-container {
  width: 100%;
  height: max-content;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.product-list {
  margin: 20px 0;
}

.products {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.product {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 200px;
}

footer {
  margin-top: 20px;
  padding: 10px;
  background-color: #f1f1f1;
}
</style>
