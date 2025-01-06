<template>
  <div class="h-full">
    <section class="contact-section">
      <b-jumbotron bg-variant="info" text-variant="white" class="d-flex rounded-0">
        <h1 class="text-center my-auto mx-auto">Contact</h1>
      </b-jumbotron>
    </section>

    <section class="p-5">
      <b-row>
        <b-col>
          <h1 class="text-dark">Contact Us</h1>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="form.name" required />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea id="message" v-model="form.message" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </b-col>
        <b-col>
          <h1 class="text-dark">Address</h1>
          <p><strong>Address:</strong> 1234 Main St, Springfield, IL 62701</p>
          <p>
            <strong>Email:</strong>
          </p></b-col
        >
      </b-row>
    </section>
  </div>
</template>

<script>
import { BJumbotron } from "bootstrap-vue";

export default {
  comopnents: {
    BJumbotron,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {

      // Reset form
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.contact-page {
  min-width: 500px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.contact-section {
  padding: 20px;
  height: 300px;
  text-align: center;
}

.contact-section .jumbotron {
  height: 100%;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
