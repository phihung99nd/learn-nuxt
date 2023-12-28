<script setup lang="ts">
import {mergeProps} from "vue";
import {useTheme} from 'vuetify'
import {useCartStore} from "~/stores/cart";

const { $bus } = useNuxtApp()
const router = useRouter() // it similar to $router in vue 2
const route = useRoute() // it similar to $route in vue 2
const {locales, setLocale} = useI18n() // from Vue-I18n

const cartStore = useCartStore()
const theme = useTheme()

const crumb = computed(() => {
  const fullPath = route.fullPath
  const params = fullPath.substring(1).split('/')
  const crumbs: any[] = [{
    name: 'index',
    path: '/',
    meta: {title: 'Index'}
  }]

  let path = ''

  params.forEach((param, index) => {
    path = `${path}/${param}`
    const match = router.resolve(path)

    if (match.name != null) {
      crumbs.push({
        ...match,
        meta: {
          title: param,
          ...match.meta,
        },
      })
    }
  })

  return crumbs
})

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const drawer = ref(true)

function changeLanguage(e: string) {
  setLocale(e)
  $bus.$emit('locale-change')
}

function checkCart() {
  console.log(cartStore.cart)
}

</script>

<template>
  <v-layout full-height class="rounded rounded-md">
    <v-navigation-drawer
        permanent
        :elevation="1"
        :rail="drawer"
        style="position: fixed"
    >
      <v-list-item
          height="64"
          prepend-avatar="~/assets/images/avatar.jpg"
          title="Learn Nuxt 3"
          subtitle="phihung99nd@gmail.com"
      />
      <v-divider></v-divider>
      <v-list-item link prepend-icon="mdi-home" :title="$t('Index')" to="/welcome"></v-list-item>
      <v-list-item link prepend-icon="mdi-package" :title="$t('Products')" to="/products"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar :height="64" flat style="position: fixed">
      <v-btn size="small" v-if="drawer" icon="mdi-menu-open" @click="drawer = false"></v-btn>
      <v-btn size="small" v-else icon="mdi-menu-close" @click="drawer = true"></v-btn>
      <v-app-bar-title>
        <a href="https://nuxt.com/" target="_blank">
          <v-icon icon="mdi-nuxt" color="#00dc82" size="x-large"/>
        </a>
      </v-app-bar-title>
      <template v-slot:append>
        <div class="d-flex align-center ga-4">
          <v-badge color="#ff3030" :dot="cartStore.getCartQuantity == 0" :content="cartStore.getCartQuantity as number">
            <v-btn size="small" icon="mdi-cart-outline" @click="checkCart"/>
          </v-badge>
          <v-tooltip location="start" origin="auto">
            <template v-slot:activator="{ props: tooltip }">
              <v-btn size="small" icon="mdi-theme-light-dark" @click="toggleTheme" v-bind="tooltip"/>
            </template>
            <span>{{ $t('Light/Dark') }}</span>
          </v-tooltip>
          <v-menu>
            <template v-slot:activator="{ props: menu }">
              <v-tooltip location="start" origin="auto">
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn size="small" icon="mdi-web" v-bind="mergeProps(menu, tooltip)"></v-btn>
                </template>
                <span>{{ $t('Language') }}</span>
              </v-tooltip>
            </template>

            <v-list>
              <v-list-item
                  v-for="loc in locales"
                  :key="loc.code"
                  link
                  @click="changeLanguage(loc.code)"
              >
                <v-list-item-title>{{ $t(loc.name) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <v-breadcrumbs divider="-">
        <v-breadcrumbs-item v-for="(item, index) in crumb" :key="index" :to="item.path">
          {{$t(item.meta.title)}}
          <v-breadcrumbs-divider v-if="index != crumb.length - 1" divider="/"/>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <slot/>
    </v-main>
  </v-layout>
</template>

<style lang="scss" scoped>
* {

}
</style>