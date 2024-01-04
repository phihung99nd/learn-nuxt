<script setup lang="ts">
import type {Movie} from "~/types";

defineProps<{
  movie: Movie
}>()

</script>

<template>
  <NuxtLink class="cursor-pointer card" :to="{name: 'movies-id', params: {id: movie.id}}">
    <div class="img-container">
      <v-img
          class="w-full rounded"
          cover
          :src="provideImgUrl(movie.poster_path)"
          :lazy-src="provideImgUrl(movie.poster_path)"
          :style="{'view-transition-name': `movie-${movie.id}`}"
      />
    </div>
    <div class="mt-2 my-clamp-2">
      {{ movie.title || movie.name }}
    </div>
    <div class="d-flex align-center my-font-12">
      <v-rating
          color="#00AC67"
          :model-value="formatRating(movie.vote_average)/2"
          size="x-small"
          density="comfortable"
          half-increments
          readonly
      />
      <span>{{ formatRating(movie.vote_average) }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  .img-container {
    padding: 2px;
    border-radius: 4px;
    background: rgb(156, 163, 175, 0.1);
    transition: all $transition-duration $transition-effect;
  }

  &:hover {
    .img-container {
      transform: scale(1.05);
      box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
    }
  }
}
</style>