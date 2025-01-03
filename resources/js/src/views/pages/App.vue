<template>
  <div id="app" class="content-wrapper">
    <component :is="defineLayout()">
      <router-view />
    </component>
  </div>
</template>

<script>
import AdminLayout from "@core/layouts/AdminLayout.vue";
import DefaultLayout from "@core/layouts/DefaultLayout.vue";
import { defineLayout } from "@core/layouts/utils.js";
export default {
  components: {
    AdminLayout,
    DefaultLayout,
  },
  mounted() {},
  methods: {
    onClickPayment() {
      window.snap.pay("08ae4c71-5047-44cc-96db-b6cbcc9ae77b");
    },
  },
  data() {
    return { defineLayout };
  },
};
</script>

<style>
.content-wrapper {
  height: 100vh;
  overflow: auto;
}
</style>
