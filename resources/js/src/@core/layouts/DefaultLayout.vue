<template>
  <div class="min-h-full d-flex">
    <main class="min-h-full">
      <transition name="fade" mode="out-in">
        <slot></slot>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
main {
  flex: 1;
  min-height: 100%;
}
</style>
