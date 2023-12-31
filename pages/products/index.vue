<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {CartItem} from "~/types";
import {useCartStore} from "~/stores/cart";
import {getProductList} from "~/composables/api/fakestore";

definePageMeta({
  title: 'Product List'
})

const {t, locale} = useI18n({useScope: "global"});
useHead({
  title: t('Product List')
})
// similar to data() in Vue 2
const limit = ref(10);
const sort = ref('asc');

// similar to $router in Vue 2
const router = useRouter()


const cartStore = useCartStore()
/**
 * Fetch API from ~/server/api/products/get
 */
const {pending, data: products, error} = await useAsyncData('products-list', () => {
  const params = {
    limit: limit.value,
    sort: sort.value
  }
  return getProductList(params)
}, {
  watch: [limit, sort]
})


const headers = [
  {title: t('Id'), key: 'id', align: 'center'},
  {title: t('Title'), key: 'title'},
  {title: t('Price'), key: 'price'},
  {title: t('Image'), key: 'image', align: 'center'},
  {title: t('Actions'), key: 'action', align: 'center'}
]

function showDetail(item: CartItem) {
  router.push({name: 'products-id', params: {id: item.id}})
}

function addToCart(item: CartItem) {
  cartStore.ADD_TO_CART(item)
}
</script>

<template>
  <v-container fluid>
    <base-page-header :heading="$t($route.meta.title)">
      <template #subtitle>
        {{$t('This section using')}}
        <a class="text-primary-darken" href="https://nuxt.com/docs/getting-started/data-fetching" target="_blank" >Data fetching</a> {{$t('and')}}
        <a class="text-primary-darken" href="https://pinia.vuejs.org/core-concepts/" target="_blank">Pinia store</a>
      </template>
    </base-page-header>
    <v-data-table-server
        v-model:items-per-page="limit"
        :headers="headers"
        fixed-header
        hover
        height="calc(100vh - 306px)"
        :items-length="100"
        :items="products as any[]"
        :loading="pending"
    >
      <template v-slot:headers="{ columns }">
        <tr>
          <template v-for="column in columns" :key="column.key">
            <th class="text-primary-darken my-font-16 my-weight-500">
              <div :style="{textAlign: column.align}">{{ column.title }}</div>
            </th>
          </template>
        </tr>
      </template>
      <template #item.price="{value}">
        <div class="d-flex justify-start">
          {{ unitPrice(value, locale) }}
        </div>
      </template>
      <template #item.image="{value}">
        <div class="d-flex justify-center">
          <v-img
              :width="100"
              :height="50"
              :src="value"
          ></v-img>
        </div>
      </template>
      <template #item.action="{item}">
        <div class="d-flex justify-center">
          <v-tooltip location="top" origin="auto">
            <template v-slot:activator="{ props: tooltip }">
              <v-btn flat size="small" icon="mdi-text-search-variant" v-bind="tooltip" @click="showDetail(item)"/>
            </template>
            <span>{{ $t('Detail') }}</span>
          </v-tooltip>
          <v-tooltip location="top" origin="auto">
            <template v-slot:activator="{ props: tooltip }">
              <v-btn flat size="small" icon="mdi-cart-plus" v-bind="tooltip" @click="addToCart(item)"/>
            </template>
            <span>{{ $t('Add to cart') }}</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<style scoped lang="scss">

</style>
