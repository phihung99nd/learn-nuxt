<script setup lang="ts">
import {useDisplay} from 'vuetify'
import {getMovieById} from "~/composables/api/tmdb";
import {useMounted} from "@vueuse/core";

const route = useRoute()
const {mdAndUp, smAndDown} = useDisplay()
const mounted = useMounted()
const showModal = useIFrameModal()
const wideHero = ref(true)       // check if hero width is wide enough to show content
const el = ref<HTMLDivElement>() // element hero-container
const observer = ref()           // ResizeObserver API: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver
const observerDebounce = ref()   // observer debounce state

onMounted(() => {
  observer.value = new ResizeObserver(entries => {
    clearTimeout(observerDebounce.value)
    observerDebounce.value = setTimeout(() => {
      console.log(entries)
      wideHero.value = entries[0]?.target?.offsetWidth >= 960
    }, 200)
  })
  observer.value.observe(el.value, {attributes: true})
})

onBeforeUnmount(() => {
  observer.value.unobserve(el.value)
})

const {pending, data: movie, error} = await useAsyncData('movie-id', () => getMovieById(route.params.id))

const trailer = computed(() => getTrailer(movie.value))


function playTrailer() {
  if (trailer.value)
    showModal(trailer.value)
}
</script>

<template>
  <div v-show="!pending">
    <div class="hero-container" :class="{md: mdAndUp && wideHero, sm: smAndDown && !wideHero}"
         :style="{'view-transition-name': `movie-${movie.id}`}" ref="el">
      <NuxtImg
          class="backdrop h-full"
          width="1000"
          height="600"
          fit="cover"
          :src="provideImgUrl(movie.backdrop_path)"
      />
      <div class="d-flex meta-info" :class="{[`align-${smAndDown && !wideHero ? 'end' : 'center'}`]: true}">
        <Transition appear name="backdrop">
          <div v-show="mounted">
            <h1
                class="mt-2 my-weight-400"
                :class="{
                    [`my-clamp-${smAndDown && !wideHero ? 1 : 2}`]: true,
                    [`my-font-${smAndDown && !wideHero ? 32 : 48}`]: true
            }">
              {{ movie.title || movie.name }}
            </h1>
            <template v-if="!(smAndDown && !wideHero)">
              <div class="d-flex align-center mt-2 ga-2">
                <v-rating
                    color="#00AC67"
                    :model-value="formatRating(movie.vote_average)/2"
                    size="x-small"
                    density="comfortable"
                    half-increments
                    readonly
                />
                <span class="op50">{{ formatRating(movie.vote_average) }}</span>
                <span class="op50">·</span>
                <span class="op50">{{ movie.vote_count }} {{ $t('reviews') }}</span>
                <span class="op50" v-if="movie.release_date">·</span>
                <span class="op50" v-if="movie.release_date">{{ movie.release_date.slice(0, 4) }}</span>
              </div>
              <p class="mt-2 op80" :class="{[`my-clamp-${mdAndUp && wideHero ? 5 : 3}`]: true}">
                {{ movie.overview }}
              </p>
            </template>
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
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%);
    padding: 40px;
  }

  &.md {
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
      background-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 65%, rgba(0, 0, 0, 0) 100%);
      padding: 0 100px;
      display: flex;
      align-items: center;
    }
  }

  &.sm {
    .backdrop {
      width: 100%;
      height: auto!important;
    }
  }
}

.op50 {
  opacity: 0.5;
}

.op80 {
  opacity: 0.8;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: transform .75s cubic-bezier(.4, .25, .3, 1), opacity .5s cubic-bezier(.4, .25, .3, 1);
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
  transform: translate3d(0, 40px, 0);
}

.backdrop-enter-to,
.backdrop-leave-from {
  opacity: 1;
  transform: translateZ(0);
}
</style>