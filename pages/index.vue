<script setup lang="ts">
definePageMeta({
  /**
   * middleware that redirect to welcome page after navigate to index page
   * @param from: current route, here is index
   */
  middleware: (from) => {
    if (from.path === '/') {
      return navigateTo(`/welcome`)
    }
  }
})
</script>

<template>
<div></div>
</template>

<style scoped>

</style>