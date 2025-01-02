<template>
  <section>
    <b-container class="product-container mt-2 mb-5 pb-4">
      <b-row>
        <b-col>
          <h1>Product List</h1>
        </b-col>
      </b-row>
      <div
        v-if="loading"
        class="h-full d-flex align-items-center justify-content-center"
        style="min-height: 400px"
      >
        <b-spinner></b-spinner>
      </div>
      <b-row v-else-if="products.length > 0" class="mb-5">
        <b-col
          cols="4"
          md="4"
          sm="6"
          class="py-2"
          v-for="product in products"
          :key="product.id"
        >
          <b-card
            img-alt="Product image"
            img-top
            class="shadow-sm product-card mouse-pointer"
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

      <div
        v-else
        class="h-full d-flex align-items-center justify-content-center"
        style="min-height: 400px"
      >
        <p>No products found</p>
      </div>

      <b-row
        v-if="!loading"
        class="position-absolute w-100"
        style="bottom: 0; left: 0; right: 0"
      >
        <b-col class="d-flex">
          <b-pagination
            v-model="page"
            :total-rows="totalProducts"
            :per-page="perPage"
            first-number
            class="mx-auto"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { getList } from "@/services/api/product";
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BCard,
  BCol,
  BPagination,
  BContainer,
  BCardImg,
  BCardText,
  BRow,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import category from "../../../../router/admin/pages/category";
export default {
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BContainer,
    BCol,
    BRow,
    BCard,
    BCardImg,
    BCardText,
    BButton,
    BSpinner,
  },
  methods: {
    async getProducts(slug = "", perPage = 5, page, sortBy, sortDesc = "desc") {
      this.loading = true;
      try {
        const response = await getList({
          params: {
            perPage,
            page,
            slug,
            sortBy,
            sortDesc,
            category: this.$route.query.category ?? null,
          },
        });
        this.products = response.data.data;
        this.page = response.data.current_page;
        this.totalProducts = response.data.total;
        this.lastPage = response.data.last_page;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    goToProduct(slug) {
      this.$router.push({ name: "product-detail", params: { slug: slug } });
    },
    hasCategory() {
      return this.$route.query.category ? true : false;
    },
    slugToString() {
      return this.$route.query.category.split("-").join(" ");
    },
    fetchData(i) {
      console.log();
    },
  },
  watch: {
    $route(to, from) {
      this.getProducts(null, this.perPage, this.page, "created_at", "desc");
    },
    page(to, from) {
      this.getProducts(null, this.perPage, this.page, "created_at", "desc");
    },
    perPage(to, from) {
      this.getProducts(null, this.perPage, this.page, "created_at", "desc");
    },
  },
  data() {
    this.getProducts(null, this.perPage, this.page, "created_at", "desc");

    const products = [];
    return {
      page: 1,
      totalProducts: 0,
      lastPage: 0,
      perPage: 5,
      products,
      loading: true,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.product-container {
  position: relative;
  margin-top: 20px;
  min-height: 50vh;
}
</style>
