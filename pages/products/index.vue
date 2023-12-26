<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: "global"});
definePageMeta({
  title: 'Product List'
})
// similar to data() in Vue 2
const page = ref(1);
const limit = ref(10);
const sort = ref('asc');

/**
 * Fetch API from ~/server/api/cafes/get
 */
const {pending, data: products, error} = await useFetch('/api/products/get', {
  query: {page, limit, sort},
  watch: [page, limit, sort]
})

const headers = [
  {title: t('Id'), key: 'id', align: 'center'},
  {title: t('Title'), key: 'title'},
  {title: t('Price'), key: 'price'},
  {title: t('Image'), key: 'image', align: 'center'},
]
</script>

<template>
  <v-container fluid>
    <base-page-header :heading="$t($route.meta.title)"/>
    <v-data-table-server
        v-model:items-per-page="limit"
        :headers="headers"
        fixed-header
        hover
        height="calc(100vh - 224px)"
        :items-length="100"
        :items="products"
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
      <template #item.image="{value}">
        <div class="d-flex justify-center">
          <v-img
              :width="100"
              :height="50"
              :src="value"
          ></v-img>
        </div>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<style scoped lang="scss">

</style>
