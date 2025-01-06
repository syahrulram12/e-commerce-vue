<template>
  <div class="d-flex justify-content-center align-items-center h-full">
    <div class="register-container container-fluid rounded-lg shadow-lg px-5 pt-4 pb-5">
      <h2 class="text-left font-weight-bold pb-3 pt-2">Login</h2>
      <ValidationObserver ref="loginForm" v-slot="{ invalid }">
        <form @submit.prevent="handleLogin">
          <b-row>
            <b-col cols="6">
              <ValidationProvider
                name="email"
                vid="email"
                rules="required|email"
                #default="{ errors }"
              >
                <div class="form-group">
                  <label for="email">Email:</label>
                  <b-form-input
                    type="email"
                    v-model="formData.email"
                    id="email"
                    :state="errors.length > 0 ? false : null"
                    ref="email"
                  />
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </div>
              </ValidationProvider>
            </b-col>

            <b-col cols="6">
              <ValidationProvider
                name="Password"
                vid="password"
                rules="required"
                #default="{ errors }"
              >
                <div class="form-group">
                  <label for="password">Password:</label>
                  <b-form-input
                    type="password"
                    ref="password"
                    v-model="formData.password"
                    :state="errors.length > 0 ? false : null"
                    id="password"
                  />
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </div>
              </ValidationProvider>
            </b-col>
            <b-col cols="6">
              <ValidationProvider
                name="name"
                vid="name"
                rules="required"
                #default="{ errors }"
              >
                <div class="form-group">
                  <label for="name">Name</label>
                  <b-form-input
                    type="text"
                    v-model="formData.name"
                    id="name"
                    :state="errors.length > 0 ? false : null"
                    ref="name"
                  />
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </div>
              </ValidationProvider>
            </b-col>
            <b-col cols="6">
              <ValidationProvider
                name="phone_number"
                vid="phone_number"
                rules="required"
                #default="{ errors }"
              >
                <div class="form-group">
                  <label for="phone_number">Phone Number</label>
                  <b-form-input
                    type="text"
                    v-model="formData.phone_number"
                    id="phone_number"
                    :state="errors.length > 0 ? false : null"
                    ref="phone_number"
                  />
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </div>
              </ValidationProvider>
            </b-col>
            <b-col cols="6">
              <validation-provider
                #default="{ errors }"
                vid="birth_date"
                rules="required"
                name="Tanggal Lahir"
              >
                <div class="form-group">
                  <label for="birth_date">Birth Date</label>
                  <flat-pickr
                    v-model="formData.birth_date"
                    class="form-control bg-white"
                    :config="configOptions"
                  />
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </div>
              </validation-provider>
            </b-col>
            <b-col cols="6">
              <ValidationProvider
                name="country"
                vid="country"
                rules="required"
                #default="{ errors }"
              >
                <div class="form-group">
                  <label for="gender">Gender</label>
                  <v-select
                    v-model="formData.gender"
                    :options="genders"
                    :clearable="true"
                    :filterable="false"
                    :reduce="(gender) => gender.value"
                    label="label"
                    class="select-size-md"
                  ></v-select>
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </div>
              </ValidationProvider>
            </b-col>
            <b-col cols="6">
              <ValidationProvider
                name="name"
                vid="name"
                rules="required"
                #default="{ errors }"
              >
                <div class="form-group">
                  <label for="address">Address</label>
                  <b-form-textarea
                    type="text"
                    v-model="formData.address"
                    id="address"
                    :state="errors.length > 0 ? false : null"
                    ref="address"
                  />
                  <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </div>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-button @click="handleRegister" class="mt-2" :disabled="isButtonLoading">
            <b-spinner v-if="isButtonLoading" small></b-spinner>
            Register
          </b-button>
        </form>
      </ValidationObserver>
      <hr />
      <div class="text-center">
        Already have an account?
        <b-link @click="$router.push({ name: 'login' })">Sign in now</b-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import apiService from "@/services/api-service";
import {
  BFormInput,
  BButton,
  BCol,
  BRow,
  BFormTextarea,
  BSpinner,
  BFormInvalidFeedback,
} from "bootstrap-vue";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,

    // Bootstrap components
    BFormInput,
    BCol,
    BButton,
    BRow,
    BFormTextarea,
    BSpinner,
    BFormInvalidFeedback,

    // Other
    flatPickr,
    vSelect,
  },
  setup() {
    const genders = [
      { label: "Man", value: "Man" },
      { label: "Woman", value: "Woman" },
    ];

    return { genders };
  },
  data() {
    return {
      formData: {
        email: "",
        passwprd: "",
        name: "",
        address: "",
        email: "",
      },
      email,
      isButtonLoading: false,
      required,
      configOptions: {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
      },
    };
  },
  methods: {
    handleRegister() {
      this.isButtonLoading = true;
      this.$refs.loginForm.validate().then((success) => {
        if (!success) this.isButtonLoading = false;
        this.isButtonLoading = true;
        const vForm = new FormData();
        for (let key in this.formData) {
          vForm.append(key, this.formData[key]);
        }
        // Handle login logic here
        apiService
          .register(vForm)
          .then((response) => {
            this.$bvToast.toast(`${this.formData.name} register successfully`, {
              title: `Success`,
              variant: "primary",
              toaster: "b-toaster-top-right",
              solid: true,
            });
            this.isButtonLoading = false;
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 2500);
          })
          .catch((error) => {
            if (error.response.data.errors) {
              this.$refs.loginForm.setErrors(error.response.data.errors);
            } else {
              this.$refs.loginForm.setErrors(error.response.data);
            }
            this.$refs.email.focus();
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
</style>

<style scoped>
.register-container {
  width: 100%;
  height: max-content;
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .login-container {
    width: 90%;
  }

  button {
    padding: 8px;
  }
}
</style>
