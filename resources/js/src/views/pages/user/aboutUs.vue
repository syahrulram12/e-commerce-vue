<template>
  <div class="h-full">
    <section class="about-us-section">
      <div class="jumbotron d-flex rounded-0 h-full">
        <h1 class="text-center my-auto mx-auto">About Us</h1>
      </div>
    </section>
    <section>
      <div class="about-us">
        <b-row>
          <b-col cols="6" class="text-justify">
            <h1>Company Profile</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsum at aliquid
              eum voluptates repellat ea, ipsa recusandae quos expedita rerum sunt
              accusamus provident deserunt quis harum magni inventore dolores.
            </p>
            <p>Our mission is to offer high-quality products at affordable prices.</p>
            <p>Thank you for choosing us!</p>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about-us {
  padding: 20px;
  text-align: center;
}
.about-us-section {
  padding: 20px;
  height: 300px;
  text-align: center;
}

.about-us h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.jumbotron h1 {
  color: black;
  text-shadow: none;
}

.about-us p {
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>
