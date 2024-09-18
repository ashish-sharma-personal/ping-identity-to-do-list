<script>
export const NotificationType = {
  success: 'success',
  error: 'error'
}
</script>
<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps(['message', 'type'])

const notificationType = computed(() => props.type || NotificationType.success)
</script>

<template>
  <div v-if="props.message" :class="`banner ${notificationType}`">
    <p>{{ props.message }}</p>
  </div>
</template>

<style scoped>
.banner {
  color: white;
  padding: 8px;
  text-align: center;
  width: 100%;
  border-radius: 4px;
}

.error {
  background-color: #ff4d4f;
}

.success {
  background-color: #4caf50;
}
</style>
