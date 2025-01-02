<template>
  <b-sidebar
    id="add-new-sidebar"
    :visible="isAddSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg p-4"
    shadow
    backdrop
    no-close-on-backdrop
    no-header
    right
    @hidden="resetProductData"
    @change="(val) => $emit('update:is-add-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-3"
      >
        <h5 class="mb-0">Tambah Kategori Baru</h5>
      </div>

      <!-- BODY -->
      <validation-observer ref="refObsForm">
        <!-- Form -->
        <b-form class="p-2" @submit.prevent="onSubmit" @reset.prevent="resetProductData">
          <validation-provider #default="{ errors }" vid="message">
            <b-alert variant="danger" show v-if="errors[0]">
              <div class="alert-body">
                {{ errors[0] }}
              </div>
            </b-alert>
          </validation-provider>

          <validation-provider #default="{ errors }" name="Category" vid="category_id">
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

          <!-- Product Name -->
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

          <!-- Product Name -->
          <!-- <validation-provider
            #default="{ errors }"
            name="Slug"
            vid="name"
            rules="required"
          >
            <b-form-group label="Slug">
              <b-form-input
                id="name"
                v-model="formData.slug"
                :state="errors.length > 0 ? false : null"
                trim
              />

              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider> -->

          <!-- Paid Amount -->

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

          <validation-provider
            #default="{ errors }"
            name="About Product"
            vid="about_product"
            rules="required"
          >
            <b-form-group label="About Product">
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

          <!-- Image -->

          <validation-provider
            #default="{ errors }"
            name="Image"
            vid="product_image"
            rules="required"
          >
            <b-form-group label="Image">
              <b-form-file
                v-model="formData.product_image"
                :state="errors.length > 0 ? false : null"
                accept="image/*"
                placeholder="Choose a file or drop it here..."
              />

              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Status -->
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

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              :disabled="isButtonLoading"
            >
              <b-spinner small v-show="isButtonLoading" /> Tambah
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormFile,
  BFormInvalidFeedback,
  BButton,
  BAlert,
  BSpinner,
  BFormCheckbox,
  BInputGroup,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, numeric } from "@validations";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import Cleave from "vue-cleave-component";
import { getCategorySearch } from "@/services/spa/category";
import { postData } from "@/services/spa/product";
import _ from "lodash";

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BFormTextarea,
    BFormFile,
    BFormCheckbox,
    BAlert,
    BFormInvalidFeedback,
    BButton,
    BSpinner,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
    Cleave,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isAddSidebarActive",
    event: "update:is-add-sidebar-active",
  },
  props: {
    isAddSidebarActive: {
      type: Boolean,
      required: true,
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
    return {
      isButtonLoading: false,
      required,
      numeric,
      categoryOptions,
      formData: { status: true },
      optionCleave: {
        numeral: true,
        numeralThousandsGroupStyle: "thousand",
        numeralDecimalScale: 0,
      },
    };
  },
  methods: {
    resetProductData() {
      for (var key in this.formData) {
        this.formData[key] = null;
      }
      this.$refs.refObsForm.reset();
      this.formData["status"] = true;
    },
    createSlug() {
      this.formData = {
        ...this.formData,
        slug: this.formData.name
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
      };
    },
    onSubmit() {
      this.$refs.refObsForm.validate().then((success) => {
        if (!success) return;
        const vForm = new FormData();
        for (var key in this.formData) {
          vForm.append(key, this.formData[key]);
        }
        this.isButtonLoading = true;
        postData(vForm)
          .then((response) => {
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              icon: "success",
              title: `${this.formData.name} telah berhasil ditambahkan`,
            });
            this.$emit("refetch-data");
            this.$emit("update:is-add-sidebar-active", false);
            this.isButtonLoading = false;
          })
          .catch((error) => {
            if (error.response.data.errors) {
              this.$refs.refObsForm.setErrors(error.response.data.errors);
            } else {
              this.$refs.refObsForm.setErrors(error.response.data);
            }
            this.isButtonLoading = false;
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
  },
};
</script>

<style lang="scss">
@import "@resources/sass/vue/libs/vue-flatpickr.scss";
@import "@resources/sass/vue/libs/vue-select.scss";

#add-new-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
