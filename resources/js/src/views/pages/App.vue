<template>
  <div id="app" class="content-wrapper">
    <component :is="defineLayout()">
      <router-view />
    </component>
  </div>
</template>

<script>
import AdminLayout from "@core/layouts/AdminLayout.vue";
import UserLayout from "@core/layouts/UserLayout.vue";
import DefaultLayout from "@core/layouts/DefaultLayout.vue";
import { defineLayout } from "@core/layouts/utils.js";
export default {
  components: {
    AdminLayout,
    DefaultLayout,
    UserLayout,
  },
  mounted() {},
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
