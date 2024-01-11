<script setup lang="ts">
import {arrayRandom} from "~/composables/utils";

definePageMeta({
  title: 'Todo List'
})

const router = useRouter()
const { $rule } = useNuxtApp()

const dialog = ref(false)
const addForm = ref({
  name: '',
  description: ''
})
const cardColors = ref([
  'red-lighten-1', 'pink-lighten-1', 'purple-lighten-1', 'indigo-lighten-1', 'blue-lighten-1'
])

const {pending, data, refresh, error} = await useFetch('/api/todoList', {
  method: 'GET',
})

const todoList = ref(data)
const addFormRef = ref()

function cancelAdd() {
  addForm.value.name = ''
  addForm.value.description = ''
  dialog.value = false
}

async function addTodoList() {
  const {valid} = await addFormRef.value.validate()
  if(!valid) return
  await useFetch('/api/todoList', {
    method: 'POST',
    body: {name: addForm.value.name, description: addForm.value.description, color: arrayRandom(cardColors.value)},
    onResponse({response: res}) {
      if (res.ok)
        router.push({name: 'todo-id', params: {id: res._data}})
      // addForm.value.name = ''
      // addForm.value.description = ''
      // dialog.value = false
      // refresh()
    },
  })
}


</script>

<template>
  <v-container fluid>
    <base-page-header :heading="$t($route.meta.title)">
      <template #subtitle>
        {{ $t('This section using') }}
        <a class="text-primary-darken" href="https://www.mongodb.com/en-us" target="_blank">MongoDB</a>
        {{ $t('and') }}
        <a class="text-primary-darken" href="https://mongoosejs.com/" target="_blank">Mongoose</a>
      </template>
    </base-page-header>
    <v-btn class="mb-10" color="#ba1ae5" @click="dialog = true">{{ $t('Add new to-do list') }}</v-btn>
    <v-dialog
        v-model="dialog"
        width="300"
    >
      <v-card :title="$t('Add new to-do list')">
        <v-container>
          <v-form ref="addFormRef">
            <v-text-field
                :label="$t('Title')"
                v-model="addForm.name"
                variant="underlined"
                :rules="[$rule.required]"
                maxlength="25"
                counter
                autofocus
            ></v-text-field>
            <v-text-field
                :label="$t('Description')"
                v-model="addForm.description"
                variant="underlined"
                maxlength="100"
                counter
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="cancelAdd"
          >
            {{ $t('Close') }}
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="addTodoList"
          >
            {{ $t('Save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row dense v-auto-animate>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="item in todoList" :key="item._id">
        <TodoCard :item="item" @refresh="refresh"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

</style>