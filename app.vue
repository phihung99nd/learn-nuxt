<script setup>
import {SpeedInsights} from "@vercel/speed-insights/nuxt"

const {$bus} = useNuxtApp()
const pageKey = ref(0)

$bus.$on('locale-change', () => pageKey.value++)
</script>

<template>
  <NuxtLoadingIndicator/>
  <ClientOnly>
    <SpeedInsights/>
  </ClientOnly>
  <IFrameModal/>
  <v-app>
    <NuxtLayout>
      <NuxtPage :key="pageKey"/>
    </NuxtLayout>
  </v-app>
</template>

<style lang="scss" scoped>
* {
}
</style>