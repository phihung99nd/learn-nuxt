<script setup lang="ts">
import {useCartStore} from "~/stores/cart";
import {getProductById} from "~/composables/api/fakestore";

const router = useRouter()
const route = useRoute()
const {locale} = useI18n()

const cartStore = useCartStore()

const {pending, data: product, error} = await useAsyncData('product-id', () => getProductById(route.params.id))
let quantity = ref(1)

useHead({
  title: product.value.title,
  titleTemplate: title => title ? `${title} · Product detail` : 'Product detail',
})

function back() {
  router.replace({name: 'products'})
}

function addToCart(num: number) {
  cartStore.ADD_TO_CART(product.value as any, +num)
}

</script>

<template>
  <div>
    <v-container fluid>
      <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="back">
        {{ $t('Back') }}
      </v-btn>
      <v-row class="mt-2">
        <v-col cols="12" sm="4">
          <v-img
              :aspect-ratio="1"
              :lazy-src="product.image"
              :src="product.image"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <div class="my-font-30 my-weight-600 mb-2">
            {{ product.title }}
          </div>
          <v-divider
              :thickness="4"
              length="30%"
              class="border-opacity-75"
          ></v-divider>
          <div class="my-font-24 my-weight-600 mt-8">
            {{ unitPrice(product.price, locale) }}
          </div>
          <div class="d-flex align-center ga-2 mt-2">
            <v-rating
                color="#00AC67"
                :model-value="product.rating.rate"
                size="small"
                density="compact"
                half-increments
                readonly
            />
            <span>{{ product.rating.count }} {{ $t('reviews') }}</span>
          </div>
          <v-row no-gutters class="mt-8">
            <v-col cols="12" md="8">
              {{ product.description }}
            </v-col>
          </v-row>
          <v-row class="mt-8" align="center">
            <v-col cols="12" sm="12" md="2">
              <v-list-item-title>{{ $t('Quantity') }}</v-list-item-title>
            </v-col>

            <v-col cols="12" sm="4" md="3">
              <v-text-field
                  v-model="quantity"
                  :min="1"
                  :rules="[]"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-btn
                  prepend-icon="mdi-cart-plus"
                  color="#000"
                  flat
                  @click="addToCart(quantity)"
              >
                {{ $t('Add to cart') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">

</style>