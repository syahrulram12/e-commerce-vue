<template>
  <div class="h-full">
    <section class="faq-section">
      <b-jumbotron bg-variant="info" text-variant="white" class="d-flex rounded-0">
        <h1 class="text-center my-auto mx-auto">Contact</h1>
      </b-jumbotron>
    </section>

    <section class="p-4">
      <b-row>
        <b-col cols="6">
          <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header
                header-tag="header"
                class="p-1 d-flex align-items-center justify-content-center"
                role="tab"
              >
                <h3>Frequently Asked Questions #1</h3>
                <b-link v-b-toggle.accordion-1 class="ml-auto">
                  <feather-icon
                    class="when-open"
                    size="25"
                    icon="ChevronRightIcon"
                  ></feather-icon>
                  <feather-icon
                    class="when-closed"
                    size="25"
                    icon="ChevronDownIcon"
                  ></feather-icon>
                </b-link>
              </b-card-header>
              <b-collapse
                id="accordion-1"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa,
                    obcaecati sit officiis consectetur soluta molestiae tenetur ad
                    voluptatem fugiat non aliquam mollitia architecto maxime voluptates
                    magnam at dolore magni optio.
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
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
        loading: true,
      },
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log("Form submitted:", this.form);
      // Reset form
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>
.faq-section {
  padding: 20px;
  height: 300px;
  text-align: center;
}

<style scoped></style>
