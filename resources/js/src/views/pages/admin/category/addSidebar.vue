<template>
  <b-sidebar
    id="add-new-sidebar"
    :visible="isAddSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-close-on-backdrop
    no-header
    right
    @hidden="resetCategoryData"
    @change="(val) => $emit('update:is-add-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-3"
      >
        <h5 class="mb-0">Tambah Kategori Baru</h5>

        <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
      </div>

      <!-- BODY -->
      <validation-observer ref="refObsForm">
        <!-- Form -->
        <b-form class="p-2" @submit.prevent="onSubmit" @reset.prevent="resetCategoryData">
          <validation-provider #default="{ errors }" vid="message">
            <b-alert variant="danger" show v-if="errors[0]">
              <div class="alert-body">
                {{ errors[0] }}
              </div>
            </b-alert>
          </validation-provider>

          <!-- Nama Kategori -->
          <validation-provider
            #default="{ errors }"
            name="Nama Kategori"
            vid="name"
            rules="required"
          >
            <b-form-group label="Nama Kategori">
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
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, numeric } from "@validations";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import { postData } from "@/services/spa/category";
import _ from "lodash";

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
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
    return {
      isButtonLoading: false,
      required,
      numeric,
      formData: { status: true },
    };
  },
  methods: {
    resetCategoryData() {
      for (var key in this.formData) {
        this.formData[key] = null;
      }
      this.$refs.refObsForm.reset();
      this.formData["status"] = true;
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
              title: `${this.formData.name} sucessfully added`,
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
