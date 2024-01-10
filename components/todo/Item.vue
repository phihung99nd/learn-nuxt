<script setup lang="ts">
const props = defineProps(['item'])
const emit = defineEmits(['change'])

const route = useRoute()
const checkbox = ref<HTMLInputElement>()
const checkboxValue = ref(props.item.checked)
async function updateItem(checked: boolean) {
  await useFetch(`/api/${route.params.id}/todoItem/${props.item._id}`, {
    method: 'PUT',
    body: {checked},
    onResponse({ response: res }) {
      emit('change')
    }
  })
}
function triggerCheckbox() {
  if (checkbox.value) {
    // Toggle the checkbox value
    checkboxValue.value = !checkboxValue.value;
    updateItem(checkboxValue.value)
  }
}


async function deleteItem() {
  await useFetch(`/api/${route.params.id}/todoItem/${props.item._id}`, {
    method: 'DELETE',
    onResponse({ response: res }) {
      emit('change')
    }
  })
}
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-2 pa-4 rounded border cursor-pointer" @click.stop="triggerCheckbox">
    <div class="checkbox-wrapper-52">
      <label :for="item._id" class="item">
        <input ref="checkbox" type="checkbox" :id="item._id" class="hidden" v-model="checkboxValue"/>
        <label :for="item._id" class="cbx" @click.prevent>
          <svg width="24px" height="24px" viewBox="0 0 14 12">
            <polyline points="1 7.6 5 11 13 1"></polyline>
          </svg>
        </label>
        <label :for="item._id" class="cbx-lbl my-font-18" @click.prevent>{{ item.name }}</label>
      </label>
    </div>
    <v-btn variant="plain" icon="mdi-close" density="compact" color="red-accent-3" @click.stop="deleteItem"/>
  </div>
</template>

<style scoped lang="scss">
.checkbox-wrapper-52 input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper-52 label {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  line-height: 1;
}

.checkbox-wrapper-52 *,
.checkbox-wrapper-52 ::after,
.checkbox-wrapper-52 ::before {
  box-sizing: border-box;
}

.checkbox-wrapper-52 .item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.checkbox-wrapper-52 .item .cbx {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 6px;
  border: 1px solid #c8ccd4;
  border-radius: 3px;
  cursor: pointer;
}
.checkbox-wrapper-52 .item .cbx svg {
  position: relative;
  top: -1px;
  transform: scale(0);
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.checkbox-wrapper-52 .item .cbx svg polyline {
  stroke-width: 2;
  stroke: #18cda6;
}
.checkbox-wrapper-52 .item .cbx:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -10px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background: #18cda6;
  transform: scale(0);
}
.checkbox-wrapper-52 .item .cbx:after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 2px;
  height: 2px;
  border-radius: 2px;
  box-shadow: 0 -18px 0 #18cda6, 12px -12px 0 #18cda6, 18px 0 0 #18cda6, 12px 12px 0 #18cda6, 0 18px 0 #18cda6, -12px 12px 0 #18cda6, -18px 0 0 #18cda6, -12px -12px 0 #18cda6;
  transform: scale(0);
}
.checkbox-wrapper-52 .item .cbx-lbl {
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
}
.checkbox-wrapper-52 .item .cbx-lbl:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 0;
  height: 2px;
  background: #999;
  border-radius: 2px;
}
.checkbox-wrapper-52 .item input {
  display: none;
}
.checkbox-wrapper-52 .item input:checked + .cbx {
  border-color: transparent;
}
.checkbox-wrapper-52 .item input:checked + .cbx svg {
  transform: scale(1);
  transition: all 0.4s ease;
  transition-delay: 0.1s;
}
.checkbox-wrapper-52 .item input:checked + .cbx:before {
  transform: scale(1);
  opacity: 0;
  transition: all 0.3s ease;
}
.checkbox-wrapper-52 .item input:checked + .cbx:after {
  transform: scale(1);
  opacity: 0;
  transition: all 0.6s ease;
}
.checkbox-wrapper-52 .item input:checked ~ .cbx-lbl {
  color: #d9d9d9;
}
.checkbox-wrapper-52 .item input:checked ~ .cbx-lbl:after {
  width: 100%;
  transition: all 0.4s ease;
}
</style>