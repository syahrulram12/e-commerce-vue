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
            {{ product?.category_name ?? "Product tidak ditemukan" }}
          </h1>
          <h2 class="text-left my-0 p-0">
            {{ product?.name ?? "Product tidak ditemukan" }}
          </h2>
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
    <section v-if="!loading && Object.keys(product).length > 0">
      <b-row class="px-4 py-4">
        <b-col cols="6" class="text-justify">
          <div class="">
            <div class="image-card shadow-sm my-2">
              <img :src="product?.image_link" alt="Product image" />
            </div>

            <h3>Description</h3>
            <p>{{ product?.description }}</p>
          </div>
        </b-col>
        <b-col cols="6">
          <b-card class="shadow-sm px-2 py-2">
            <b-card-body>
              <div class="product-summary justify-content-between mb-2">
                <h3 class="text-left">Price:</h3>
                <h3 class="text-right">Rp{{ product?.price?.toLocaleString() ?? 0 }}</h3>
              </div>
              <hr />
              <h5>About Product</h5>
              <p>{{ product?.about_product }}</p>

              <b-form @submit.prevent="addToCart">
                <validation-observer ref="refObsForm">
                  <validation-provider #default="{ errors }" vid="message">
                    <b-alert variant="danger" show v-if="errors[0]">
                      <div class="alert-body">
                        {{ errors[0] }}
                      </div>
                    </b-alert>
                  </validation-provider>
                  <b-row>
                    <b-col cols="6" class="mb-2">
                      <validation-provider vid="variant" v-slot="{ errors }">
                        <b-form-group>
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
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col cols="6" class="mb-2">
                      <validation-provider vid="size" v-slot="{ errors }">
                        <b-form-group>
                          <h5>Size</h5>
                          <b-form-select v-model="formData.size">
                            <option
                              v-for="(option, key) in sizes"
                              :key="key"
                              :value="option"
                            >
                              <div class="d-flex justify-content-between">
                                {{ option }}
                              </div>
                            </option>
                          </b-form-select>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col cols="6" class="mb-2">
                      <validation-provider
                        vid="quantity"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <h5>Quantity</h5>
                          <b-input-group>
                            <b-form-input
                              type="number"
                              v-model="formData.quantity"
                              @change="sum"
                              min="1"
                            />
                            <b-input-group-append>
                              <b-button
                                variant="outline-secondary"
                                @click="addQuantity()"
                              >
                                <feather-icon icon="PlusIcon" size="12"></feather-icon>
                              </b-button>
                              <b-button
                                variant="outline-secondary"
                                @click="minusQuantity()"
                              >
                                <feather-icon icon="MinusIcon" size="12"></feather-icon>
                              </b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col cols="6" class="mb-2">
                      <h5>Total Price</h5>
                      <p class="py-2">Rp{{ formData?.total_price.toLocaleString() }}</p>
                    </b-col>
                  </b-row>
                  <b-button
                    block
                    variant="primary"
                    class="mt-2"
                    @click="addToCart"
                    :disabled="buttonLoading"
                  >
                    <span class="d-flex align-items-center justify-content-center">
                      <feather-icon
                        icon="ShoppingCartIcon"
                        size="16"
                        class="mr-2"
                      ></feather-icon>
                      Add to Cart
                    </span>
                  </b-button>
                </validation-observer>
              </b-form>
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
import { addToCart } from "@/services/api/cart";
import { required } from "@validations";
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BCard,
  BButton,
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { sum } from "lodash";
import { min } from "lodash";
import { add } from "lodash";

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
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    const slug = this.$route.params.slug || 0;
    // if (id === 0) this.$router.back()
    getDetail(slug)
      .then((response) => {
        this.loading = false;
        this.product = response.data;
        this.formData = {
          ...this.formData,
          total_price: 1 * response.data.price,
        };
      })
      .catch((error) => {
        this.loading = false;
      });
    return {
      product: {},
      formData: {
        variant: "",
        size: "",
        quantity: 1,
      },
      buttonLoading: false,
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
      required,
    };
  },
  methods: {
    addQuantity() {
      this.formData = {
        ...this.formData,
        quantity: this.formData.quantity + 1,
      };
      this.sum();
    },
    minusQuantity() {
      const newQuantity = this.formData.quantity - 1;
      this.formData = {
        ...this.formData,
        quantity: newQuantity > 0 ? newQuantity : 1,
      };
      this.sum();
    },
    addToCart() {
      this.buttonLoading = true;
      this.$refs.refObsForm.validate().then((success) => {
        if (success) {
          const vForm = new FormData();
          for (let key in this.formData) {
            vForm.append(key, this.formData[key]);
          }

          vForm.append("product_id", this.product.id);
          vForm.append("customer_id", 1);
          addToCart(vForm)
            .then((response) => {
              this.buttonLoading = false;
              this.$bvToast.toast("Product added to cart", {
                title: "Success",
                variant: "success",
              });
              // window.location.reload();
            })
            .catch((error) => {
              this.$bvToast.toast("Failed to add product to cart", {
                title: "Error",
                variant: "danger",
              });
              this.buttonLoading = false;
            });
        } else {
          this.buttonLoading = false;
        }
      });
    },
    sum() {
      const { quantity } = this.formData;
      this.formData = {
        ...this.formData,
        total_price: this.product.price * quantity,
      };
    },
  },
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
