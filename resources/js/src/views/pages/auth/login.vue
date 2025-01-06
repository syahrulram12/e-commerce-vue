<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="login-container rounded-lg shadow-lg px-5 pt-4 pb-5">
      <h2 class="text-left font-weight-bold pb-3 pt-2">Login</h2>
      <ValidationObserver ref="loginForm" v-slot="{ invalid }">
        <form @submit.prevent="handleLogin">
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
                v-model="userEmail"
                id="email"
                :state="errors.length > 0 ? false : null"
                ref="email"
              />
              <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </div>
          </ValidationProvider>
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
                v-model="userPassword"
                :state="errors.length > 0 ? false : null"
                id="password"
              />
              <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </div>
          </ValidationProvider>
          <b-button @click="handleLogin" class="mt-2">
            <b-spinner v-if="isButtonLoading" small></b-spinner>
            Login
          </b-button>
        </form>
      </ValidationObserver>
      <hr />
      <div class="text-center">
        Dont have an account?
        <b-link @click="$router.push({ name: 'register' })">Register Now</b-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import apiService from "@/services/api-service";
import { required, email } from "@validations";
import { BFormInput, BButton, BSpinner, BFormInvalidFeedback } from "bootstrap-vue";
import { authUser, storeAuthUser, storeToken } from "../../../auth/utils";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,

    // Bootstrap components
    BFormInput,
    BButton,
    BSpinner,
    BFormInvalidFeedback,
  },
  data() {
    return {
      userEmail: "",
      userPassword: "",
      email,
      required,
      isButtonLoading: false,
    };
  },
  methods: {
    handleLogin() {
      this.isButtonLoading = true;
      this.$refs.loginForm.validate().then((success) => {
        if (!success) this.isButtonLoading = false;
        const vForm = new FormData();
        vForm.append("email", this.userEmail);
        vForm.append("password", this.userPassword);
        apiService
          .login(vForm)
          .then((response) => {
            this.buttonLoading = false;
            // Store Auth User
            storeAuthUser(authUser, response.data.customer);
            storeToken(response.data.token);
            // Redirect to dashboard
            this.$bvToast.toast("Login Successful", {
              title: "Success",
              variant: "success",
              solid: true,
            });
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 1500);
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

<style scoped>
.login-container {
  width: 50%;
  max-width: 500px;
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
