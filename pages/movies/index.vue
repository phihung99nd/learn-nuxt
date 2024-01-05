<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {Movie} from "~/types";

definePageMeta({
  title: 'Movie List'
})

const {t, locale} = useI18n({useScope: "global"});
useHead({
  title: t('Movie List')
})

const page = ref(1)

const {pending, data: movies, error} = await useAsyncData('movie-list', () => getMovieList(page.value), {
  watch: [page]
})

</script>

<template>
  <v-container fluid>
    <base-page-header :heading="$t($route.meta.title)">
      <template #subtitle>
        {{$t('This section using')}}
        <a
            class="text-primary-darken"
            href="https://nuxt.com/docs/guide/directory-structure/composables"
            target="_blank"
        >
          Composables
        </a> {{ $t('and') }}
        <a
            class="text-primary-darken"
            href="https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental"
            target="_blank"
        >
          View transition API
        </a>
      </template>
    </base-page-header>
    <v-row dense>
      <v-col class="mb-2" v-for="movie in movies.results as Array<Movie>" :key="movie.id" cols="6" sm="4" md="3" lg="2">
        <MovieCard :movie="movie"/>
      </v-col>
    </v-row>
    <v-pagination
        v-model="page"
        rounded="circle"
        :length="movies.total_pages"
        :total-visible="5"
    />
  </v-container>
</template>

<style scoped lang="scss">

</style>