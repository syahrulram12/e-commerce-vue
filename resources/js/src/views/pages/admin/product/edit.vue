<template>
  <b-card>
    <p class="pt-1">
      <!-- Form -->
      <b-form @submit.prevent="onSubmit">
        <!-- BODY -->
        <validation-observer ref="refObsForm">
          <validation-provider #default="{ errors }" vid="message">
            <b-alert variant="danger" show v-if="errors[0]">
              <div class="alert-body">
                {{ errors[0] }}
              </div>
            </b-alert>
          </validation-provider>
          <b-row>
            <!-- Parent Kategori -->
            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="Category"
                vid="category_id"
              >
                <b-form-group
                  label="Select Category"
                  :state="errors.length > 0 ? false : null"
                >
                  <v-select
                    v-model="formData.category_id"
                    :options="categoryOptions"
                    :clearable="false"
                    :filterable="false"
                    @search="onSearch"
                    :reduce="(label) => label.id"
                    label="name"
                  />
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Product Name -->
            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="Product Name"
                vid="name"
                rules="required"
              >
                <b-form-group label="Product Name">
                  <b-form-input
                    id="name"
                    v-model="formData.name"
                    :state="errors.length > 0 ? false : null"
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Slug -->
            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="Slug"
                vid="slug"
                rules="required"
              >
                <b-form-group label="Slug">
                  <b-form-input
                    id="slug"
                    v-model="formData.slug"
                    :state="errors.length > 0 ? false : null"
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Paid Amount -->
            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="Product Price"
                vid="price"
                rules="required"
              >
                <b-form-group label="Product Price">
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text>Rp</b-input-group-text>
                    </template>
                    <cleave
                      v-model="formData.price"
                      class="form-control"
                      :options="optionCleave"
                      :state="errors.length > 0 ? false : null"
                    />
                  </b-input-group>
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="Description"
                vid="description"
                rules="required"
              >
                <b-form-group label="Description">
                  <b-form-textarea
                    id="description"
                    v-model="formData.description"
                    :state="errors.length > 0 ? false : null"
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="About Product"
                vid="about_product"
                rules="required"
              >
                <b-form-group label="about_product">
                  <b-form-textarea
                    id="about_product"
                    v-model="formData.about_product"
                    :state="errors.length > 0 ? false : null"
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Status -->
            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="Status"
                vid="status"
                rules="required"
              >
                <b-form-group label="Status">
                  <b-form-checkbox v-model="formData.status" name="check-button" switch />

                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row>
            <!-- Image -->
            <b-col cols="12" md="6">
              <validation-provider
                #default="{ errors }"
                name="Image"
                vid="product_image"
                rules="required"
              >
                <b-form-group label="Image">
                  <b-form-file
                    v-model="formData.product_image"
                    @change="imagePreviewChanged"
                    :state="errors.length > 0 ? false : null"
                    accept="image/*"
                    placeholder="Choose a file or drop it here..."
                  />

                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col class="d-grid">
              <b-img
                :src="imagePreview"
                fluid
                alt="Product Image"
                class="mb-2 mx-auto"
                v-if="imagePreview"
              />
              <br />
              <b-button @click="clearImage" variant="danger" v-if="imagePreview"
                >Remove Image</b-button
              >
            </b-col>
          </b-row>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Simpan
            </b-button>
            <b-button
              @click="$router.go(-1)"
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
            >
              Kembali
            </b-button>
          </div>
        </validation-observer>
      </b-form>
    </p>
  </b-card>
</template>

<script>
import {
  BCard,
  BLink,
  BFormInvalidFeedback,
  BButton,
  BAvatar,
  BAlert,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormFile,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
  BFormTextarea,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { getDetail, postData } from "@/services/spa/product";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, numeric } from "@validations";
import Cleave from "vue-cleave-component";
import Ripple from "vue-ripple-directive";
import _ from "lodash";
import { getCategorySearch } from "@/services/spa/category";

export default {
  components: {
    BCard,
    BLink,
    BFormInvalidFeedback,
    BButton,
    BAvatar,
    BAlert,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    BFormTextarea,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
    vSelect,
    Cleave,
  },
  directives: {
    Ripple,
  },
  methods: {
    onSubmit() {
      this.$refs.refObsForm.validate().then((success) => {
        if (!success) return;
        const vForm = new FormData();
        for (var key in this.formData) {
          if (this.formData[key] != null) vForm.append(key, this.formData[key]);
        }
        postData(vForm)
          .then((response) => {
            this.$bvToast.toast(`${this.formData.name} updated successfully`, {
              title: `Success`,
              variant: "primary",
              toaster: "b-toaster-top-center",
              solid: true,
            });
          })
          .catch((error) => {
            if (error.response.data.errors) {
              this.$refs.refObsForm.setErrors(error.response.data.errors);
            } else {
              this.$refs.refObsForm.setErrors(error.response.data);
            }
          });
      });
    },
    onSearch(search, loading) {
      if (search.length) {
        loading(true);
        this.search(loading, search, this);
      }
    },
    search: _.debounce((loading, search, vm) => {
      getCategorySearch({ q: search })
        .then((res) => {
          vm.categoryOptions = res.data;
          loading(false);
        })
        .catch((error) => {
          vm.$bvToast.toast(`Error: ${error.response.data.message}`, {
            title: `Error`,
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true,
          });
          loading(false);
        });
    }, 300),
    clearImage() {
      this.formData.product_image = null;
      this.imagePreview = "";
    },
    imagePreviewChanged(e) {
      const file = e.target.files[0];
      if (file) {
        this.formData.product_image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
  },
  data() {
    const categoryOptions = [];
    getCategorySearch({ q: "" })
      .then((res) => {
        this.categoryOptions = res.data;
      })
      .catch((error) => {
        this.$swal({
          toast: true,
          position: "top-center",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: `Error`,
          message: `Error fetching categories`,
        });
      });

    const formData = {};
    const id = parseInt(this.$route.params.id) || 0;
    if (id == 0) this.$router.back();
    getDetail(id)
      .then((response) => {
      
        this.formData = response.data;
        this.formData["status"] = response.data["status"] == 1 ? true : false;
        this.imagePreview = response.data["image_link"];
      })
      .catch((error) => {
        if (error.response.data.errors) {
          this.$refs.refObsForm.setErrors(error.response.data.errors);
        } else {
          this.$refs.refObsForm.setErrors(error.response.data);
        }
      });

    return {
      formData,
      imagePreview: "",
      required,
      numeric,
      categoryOptions,
      optionCleave: {
        numeral: true,
        numeralThousandsGroupStyle: "thousand",
      },
    };
  },
};
</script>

<style lang="scss">
@import "@resources/sass/vue/libs/vue-select.scss";
@import "@resources/sass/vue/libs/vue-flatpickr.scss";
</style>
