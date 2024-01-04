<script setup lang="ts">
import {provideIFrameModal} from '~/composables/media'
import { onKeyDown, onClickOutside } from '@vueuse/core'

const src = ref<string | null>(null)
const el = ref<HTMLIFrameElement>()

function showModal(link: string) {
  src.value = link
}

provideIFrameModal(showModal)

onKeyDown('Escape', () => {
  if (src.value)
    src.value = null
})

onClickOutside(el, () => {
  src.value = null
})
</script>

<template>
  <div v-if="src" class="d-flex iframe-container">
    <v-btn class="close-btn" icon="mdi-close" variant="tonal"/>
    <iframe
        class="w-full ma-4 ma-md-10"
        ref="el"
        allow="autoplay; encrypted-media"
        allowfullscreen
        :src="src"
    />
  </div>
</template>

<style scoped lang="scss">
.iframe-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.9);

  .close-btn {
    position: absolute;
    top: 4px;
    right: 4px;
  }
}
</style>