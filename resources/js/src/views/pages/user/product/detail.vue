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
          <h1 class="text-left my-0 p-0">{{ product.category_name }}</h1>
          <h2 class="text-left my-0 p-0">{{ product.name }}</h2>
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
    <section v-if="!loading">
      <b-row class="px-4 py-4">
        <b-col cols="6" class="text-justify">
          <div class="">
            <div class="image-card shadow-sm my-2">
              <img :src="product.image_link" alt="Product image" />
            </div>

            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>
        </b-col>
        <b-col cols="6">
          <b-card class="shadow-sm px-2 py-2">
            <b-card-body>
              <div class="product-summary justify-content-between mb-2">
                <h3 class="text-left">Price:</h3>
                <h3 class="text-right">Rp{{ product.price.toLocaleString() }}</h3>
              </div>
              <hr />
              <h5>About Product</h5>
              <p>{{ product.about_product }}</p>
              <b-row>
                <b-col cols="6" class="mb-2">
                  <h5>Variant</h5>
                  <b-form-select v-model="formData.variant">
                    <option
                      v-for="option in variants"
                      :key="option.value"
                      :value="option.value"
                    >
                      <div class="d-flex justify-content-between">
                        {{ option.text }}
                      </div>
                    </option>
                  </b-form-select>
                </b-col>
                <b-col cols="6" class="mb-2">
                  <h5>Size</h5>
                  <b-form-select v-model="formData.size">
                    <option v-for="(option, key) in sizes" :key="key" :value="option">
                      <div class="d-flex justify-content-between">
                        {{ option }}
                      </div>
                    </option>
                  </b-form-select>
                </b-col>
                <b-col cols="7" class="mb-2">
                  <h5>Quantity</h5>
                  <b-form-group>
                    <b-input-group>
                      <b-form-input type="number" v-model="formData.quantity" min="1" />
                      <b-input-group-append>
                        <b-button
                          variant="outline-secondary"
                          @change="formData.quantity += 1"
                        >
                          <feather-icon icon="PlusIcon" size="16"></feather-icon>
                        </b-button>
                        <b-button
                          variant="outline-secondary"
                          @change="formData.quantity += 1"
                        >
                          <feather-icon icon="MinusIcon" size="16"></feather-icon>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button block variant="primary" class="mt-2">
                <span class="d-flex align-items-center justify-content-center">
                  <feather-icon icon="ShoppingCartIcon" size="16" class="mr-2"></feather-icon>
                  Add to Cart
                </span>
              </b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </section>
    <section
      v-if="loading"
      class="d-flex h-full justify-content-center align-items-center"
    >
      <b-spinner></b-spinner>
    </section>
  </div>
</template>

<script>
import { getDetail } from "@/services/api/product";
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BCard,
  BCardBody,
  BFormSelect,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from "bootstrap-vue";

export default {
  components: {
    BCard,
    BRow,
    BCardBody,
    BBreadcrumb,
    BFormSelect,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BBreadcrumbItem,
    BCol,
  },
  data() {
    const slug = this.$route.params.slug || 0;
    // if (id === 0) this.$router.back()
    getDetail(slug)
      .then((response) => {
        this.loading = false;
        this.product = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      product: {},
      formData: {
        variant: "",
        size: "",
        quantity: 1,
      },
      loading: true,
      variants: [
        { text: "Black", value: "black" },
        { text: "White", value: "white" },
        { text: "Red", value: "red" },
        { text: "Green", value: "green" },
      ],
      sizes: {
        XS: "Extra Small",
        S: "Small",
        M: "Medium",
        L: "Large",
        XL: "Extra Large",
      },
    };
  },
  created() {},
};
</script>

<style scoped>
.product-summary {
  display: flex;
}

.product-detail-section {
  padding: 20px;
  min-height: 300px !important;
  height: 200px !important;
  text-align: center;
}

.image-card {
  width: 15rem;
  height: 18rem;
  border: #d7d7d7 2px solid;
  overflow: hidden;
}

a.router-link-active {
  color: #ffffff !important;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: #ffffff;
}

.image-card img {
  object-fit: cover;
  height: 100%;
}
.product-detail-section .jumbotron h1 {
  text-shadow: none;
  color: black;
}
</style>
