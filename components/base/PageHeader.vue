<script setup lang="ts">
const props = defineProps(['heading'])
</script>

<template>
  <section class="mb-6 text-center">
    <h1
        class="font-weight-light mb-2 headline"
        v-text="heading"
    />

    <span
        class="font-weight-light subtitle-1"
    >
      <slot name="subtitle"/>
    </span>
  </section>
</template>

<style scoped lang="scss">

</style>