<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const {pending, data: product, error} = await useFetch(`/api/products/${route.params.id}`)

function back() {
  router.replace({name: 'products'})
}
</script>

<template>
  <div>
    <v-container fluid>
      <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="back">
        {{ $t('Back') }}
      </v-btn>
      <v-row>
        <v-col cols="12" sm="6">
          <v-img
              :aspect-ratio="1"
          />
        </v-col>
        <v-col cols="12" sm="6">
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          c
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">

</style>