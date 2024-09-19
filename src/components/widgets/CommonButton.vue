<script>
export const ButtonStyle = {
  basic: 'basic',
  danger: 'danger'
}
</script>
<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps(['label', 'style', 'isDisabled'])

const emit = defineEmits(['click'])

const buttonStyle = computed(() => props.style || ButtonStyle.basic)
</script>

<template>
  <button :disabled="props.isDisabled" :class="buttonStyle" @click="emit('click')">
    {{ label }}
  </button>
</template>

<style scoped>
button {
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  height: 36px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.basic {
  background-color: #4caf50;
}

.basic:not(:disabled):hover {
  background-color: #45a049;
}

.danger {
  background-color: #ff4d4f;
}

.danger:hover {
  background-color: #ff7875;
}
</style>
