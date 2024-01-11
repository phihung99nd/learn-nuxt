<script setup lang="ts">
import type {TodoList} from "~/types";

const props = defineProps<{
  item: TodoList,
}>()
const emit = defineEmits(['refresh'])

const { $rule } = useNuxtApp()
const router = useRouter()
const dialog = ref(false)
const state = reactive({
  editForm: {name: '', description: ''},
  newItem: {name: '', checked: false}
})

const editFormRef = ref()

async function editList() {
  const {data} = await useFetch(`/api/${props.item._id}`, {
    method: 'GET',
  })
  state.editForm = data
  dialog.value = true
}

async function deleteList() {
  await useFetch('/api/todoList', {
    method: 'DELETE',
    query: {id: props.item._id},
    onResponse({response: res}) {
      emit('refresh')
    }
  })
}

function cancelAdd() {
  state.editForm.name = ''
  state.editForm.description = ''
  dialog.value = false
}

async function editTodoList() {
  const {valid} = await editFormRef.value.validate()
  if(!valid) return
  await useFetch(`/api/${props.item._id}`, {
    method: 'PUT',
    body: {name: state.editForm.name, description: state.editForm.description},
    onResponse({response: res}) {
      state.editForm.name = ''
      state.editForm.description = ''
      dialog.value = false
      emit('refresh')
    },
  })
}

function toListDetail() {
  router.push({name: 'todo-id', params: {id: props.item._id}})
}
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
        v-bind="props"
        class="cursor-pointer"
        variant="tonal"
        height="100"
        :elevation="isHovering ? 3 : 0"
        :color="item.color"
        @click="toListDetail"
    >
      <v-card-item>
        <v-card-title>
          <div class="d-flex justify-space-between align-center">
            <span>{{ item.name }}</span>
            <div class="d-flex align-center" v-if="isHovering">
              <v-btn density="compact" flat icon="mdi-pencil" @click.stop="editList"></v-btn>
              <v-btn density="compact" flat icon="mdi-delete" @click.stop="deleteList"></v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-subtitle class="my-clamp-2">
          {{ item.description }}
        </v-card-subtitle>
      </v-card-item>
    </v-card>
    <v-dialog
        v-model="dialog"
        width="300"
    >
      <v-card :title="$t('Edit to-do list')">
        <v-container>
          <v-form ref="editFormRef">
            <v-text-field
                :label="$t('Title')"
                v-model="state.editForm.name"
                :rules="[$rule.required]"
                variant="underlined"
                maxlength="25"
                counter
                autofocus
            ></v-text-field>
            <v-text-field
                :label="$t('Description')"
                v-model="state.editForm.description"
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
              @click="editTodoList"
          >
            {{ $t('Save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-hover>
</template>

<style scoped lang="scss">

</style>