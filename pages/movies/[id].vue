<script setup lang="ts">
import { useDisplay } from 'vuetify'
import {getMovieById} from "~/composables/api/tmdb";
import {useMounted} from "@vueuse/core";

const route = useRoute()
const { mdAndUp } = useDisplay()
const mounted = useMounted()

const {pending, data: movie, error} = await useAsyncData('movie-id', () => getMovieById(route.params.id))

const showModal = useIFrameModal()
const trailer = computed(() => getTrailer(movie.value))

function playTrailer() {
  if (trailer.value)
    showModal(trailer.value)
}
</script>

<template>
  <div v-show="!pending">
    <div class="hero-container" :class="{lg: mdAndUp}" :style="{'view-transition-name': `movie-${movie.id}`}">
      <NuxtImg
          class="backdrop h-full"
          width="1000"
          height="600"
          fit="cover"
          :src="provideImgUrl(movie.backdrop_path)"
      />
      <div class="d-flex align-center meta-info">
        <Transition appear name="backdrop">
          <div v-show="mounted">
            <h1 class="mt-2 my-font-48 my-weight-400 my-clamp-2">
              {{ movie.title || movie.name}}
            </h1>
            <div class="d-flex align-center mt-2 ga-2">
              <v-rating
                  color="#00AC67"
                  :model-value="formatRating(movie.vote_average)/2"
                  size="x-small"
                  density="comfortable"
                  half-increments
                  readonly
              />
              <span class="op50">{{formatRating(movie.vote_average)}}</span>
              <span class="op50">·</span>
              <span class="op50">{{movie.vote_count}} {{$t('reviews')}}</span>
              <span class="op50" v-if="movie.release_date">·</span>
              <span class="op50" v-if="movie.release_date">{{movie.release_date.slice(0, 4)}}</span>
            </div>
            <p class="mt-2 op80" :class="{[`my-clamp-${mdAndUp ? 5 : 3}`]: true}">
              {{movie.overview}}
            </p>
            <div class="mt-5 mb-5">
              <v-btn prepend-icon="mdi-play-outline" variant="tonal" size="large" @click="playTrailer">
                {{ $t('Watch trailer') }}
              </v-btn>
            </div>
          </div>
        </Transition>
      </div>
    </div>
<!--    <MovieDetail :movie="movie"/>-->
  </div>
</template>

<style scoped lang="scss">
.hero-container {
  background: rgb(var(--v-theme-background));
  width: 100%;
  aspect-ratio: 3/2;
  position: relative;
  .backdrop {
    position: absolute;
    top: 0;
    right: 0;
  }

  .meta-info {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-image: linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
    padding: 40px;
  }

  &.lg {
    aspect-ratio: 25/9;

    .backdrop {
      left: 33%;
      width: 67%;
    }

    .meta-info {
      width: 60%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(90deg, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);
      padding: 0 100px;
      display: flex;
      align-items: center;
    }
  }
}

.op50 {
  opacity: 0.5;
}

.op80 {
  opacity: 0.8;
}
</style>