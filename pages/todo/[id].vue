<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const {pending, data, refresh, error} = await useFetch(`/api/${route.params.id}`, {
  method: 'GET'
})

const list = ref(data)
const newItem = ref('')
const layout = ref(0)
const snackbar = ref(false)

function back() {
  router.push({name: 'todo'})
}

async function addNewItem() {
  await useFetch(`/api/${route.params.id}/todoItem`, {
    method: 'POST',
    body: {name: newItem.value, checked: false},
    onResponse({response: res}) {
      newItem.value = ''
      refresh()
    }
  })
}

function copyURL() {
  navigator.clipboard.writeText(window.location.href)
  snackbar.value = true
}
</script>

<template>
  <v-container class="pa-0" fluid>
    <div class="header d-flex ga-2">
      <v-btn icon="mdi-chevron-left" variant="plain" @click="back"/>
      <div>
        <h1>{{ list.name }}</h1>
        <div>{{ list.description }}</div>
      </div>
    </div>
    <v-container style="max-width: 1000px">
      <v-alert
          class="mb-2"
          color="blue-accent-4"
          density="comfortable"
          variant="tonal"
      >
        <div class="d-flex justify-space-between align-center">
          <span>{{ $t('Share this list to collaborate with others') }}</span>
          <v-btn variant="text" density="compact" @click="copyURL">{{ $t('Copy URL') }}</v-btn>
        </div>
      </v-alert>
      <div class="d-flex ga-2">
        <v-text-field
            v-model="newItem"
            :placeholder="$t('Add new task')"
            variant="outlined"
            density="comfortable"
            @keydown.native.enter="addNewItem"
        />
        <v-btn icon="mdi-plus" variant="tonal" class="rounded" color="blue-darken-2" @click="addNewItem"/>
      </div>
      <div class="d-flex justify-center">
        <v-btn-toggle
            class="mb-2"
            v-if="list.items.length > 0"
            v-model="layout"
            divided
            mandatory
            variant="outlined"
            density="compact"
        >
          <v-btn icon="mdi-format-align-justify"></v-btn>
          <v-btn icon="mdi-view-grid-outline"></v-btn>
        </v-btn-toggle>
      </div>
      <v-row dense v-auto-animate>
        <v-col :cols="layout == 0 ? 12 : 6" v-for="item in list.items" :key="item._id">
          <TodoItem :item="item" @change="refresh"/>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
        v-model="snackbar"
        timeout="2000"
        location="bottom right"
        variant="elevated"
        color="green"
        rounded
    >
      {{ $t('Copied URL') }}
    </v-snackbar>
  </v-container>
</template>

<style scoped lang="scss">

</style>