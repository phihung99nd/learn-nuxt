<script setup lang="ts">
defineProps(['movie'])
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" sm="4">
        <v-img
            class="w-full rounded"
            cover
            :src="provideImgUrl(movie.poster_path)"
            :lazy-src="provideImgUrl(movie.poster_path)"
        />
      </v-col>
      <v-col cols="12" sm="8">

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

</style>