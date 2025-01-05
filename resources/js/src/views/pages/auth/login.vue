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
          <b-button @click="handleLogin" class="mt-2">Login</b-button>
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
import apiService from "@/services/network-service";
import { required, email } from "@validations";
import { BFormInput, BButton } from "bootstrap-vue";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,

    // Bootstrap components
    BFormInput,
  },
  data() {
    return {
      userEmail: "",
      userPassword: "",
      email,
      required,
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.buttonLoading = true;
          const vForm = new FormData();
          vForm.append("email", this.userEmail);
          vForm.append("password", this.userPassword);
          apiService
            .login(vForm)
            .then((response) => {
              this.buttonLoading = false;
              // Store Auth User
              localStorage.setItem("authUser", JSON.stringify(response.data.user));
              localStorage.setItem("authToken", response.data.token);
              // Redirect to dashboard
              this.$bvToast.toast("Login Successful", {
                title: "Success",
                variant: "success",
                solid: true,
                time: 3000,
              });
              this.$router.push({ name: "home" });
            })
            .catch((error) => {
              console.log(error.response.data.errors);
              if (error.response.data.errors) {
                this.$refs.loginForm.setErrors(error.response.data.errors);
              } else {
                this.$refs.loginForm.setErrors(error.response.data);
              }
              this.$refs.email.focus();
            });
        }
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
