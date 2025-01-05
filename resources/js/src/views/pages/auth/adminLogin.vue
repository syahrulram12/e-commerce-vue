<template>
  <div class="admin-login">
    <div class="login-container border border-2 border-success row">
      <div class="col-6">
        <img src="" alt="Admin Login" class="login-image" />
      </div>
      <div class="col-6 align-self-center text-left">
        <form @submit.prevent="login">
          <h2>Admin Login</h2>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Handle login logic here
      console.log("Email:", this.email);
      console.log("Password:", this.password);
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
  padding: 20px;
  width: 50%;
  max-width: 700px;
  height: 30rem;
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
