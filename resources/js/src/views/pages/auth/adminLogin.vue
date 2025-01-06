<template>
  <div class="admin-login">
    <div class="login-container border border-2 border-success row overflow-hidden">
      <div class="col-6 col-lg-5 d-none d-md-flex col-md-5 p-0 position-relative h-full">
        <div
          class="overlay w-full h-full position-absolute bg-dark"
          style="opacity: 50%"
        ></div>
        <h3
          class="p-4 my-auto absolute-center text-white text-center"
          style="z-index: 99"
        >
          Welcome Admin
        </h3>
        <img
          src="https://img.freepik.com/free-photo/unrecognizable-businessman-typing-keyboard-office_1098-20579.jpg?t=st=1736178668~exp=1736182268~hmac=b97b8101bd719a866f7d817f067bec4e2431ee8c9ad21fd8424a7d361401ec3d&w=1380"
          alt="Admin Login"
          class="img-fluid object-cover"
        />
      </div>
      <div
        class="col-12 col-lg-7 p-0 col-md-7 align-self-center text-left p-2 p-md-5 h-full border"
      >
        <h3 class="p-4 my-auto text-center">Login</h3>
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
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import httpService from "@/services/network-service";
import { required, email } from "@validations";
import { BFormInput, BButton, BSpinner, BFormInvalidFeedback } from "bootstrap-vue";
import { authAdmin, storeAuthUser } from "@/auth/utils";

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
        httpService
          .login(vForm)
          .then((response) => {
            this.buttonLoading = false;
            // Store Auth User
            storeAuthUser(authAdmin, JSON.stringify(response.data.user));
            // Redirect to dashboard
            this.$bvToast.toast("Login successfully", {
              title: "Success",
              variant: "success",
              solid: true,
            });
            // setTimeout(() => {
            //   this.$router.push({ name: "admin-dashboard" });
            // }, 1000);
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
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-container {
  background: white;
  padding: 10px;
  width: 70%;
  max-width: 700px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-image {
  width: 200px;
  height: 200x;
  margin-bottom: 20px;
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
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
