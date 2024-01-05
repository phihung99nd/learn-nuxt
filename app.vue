<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
const {$bus} = useNuxtApp()
let pageKey = 0

$bus.$on('locale-change', () => pageKey++)
</script>

<template>
  <NuxtLoadingIndicator/>
  <SpeedInsights />
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