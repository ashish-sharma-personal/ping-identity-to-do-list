<script setup>
import { defineProps } from 'vue'

defineProps(['to'])
</script>

<template>
  <RouterLink class="router-link" :to="to"> <slot></slot> </RouterLink>
</template>

<style scoped>
.router-link {
  padding: 8px 12px;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  height: 36px;
}

.router-link:hover {
  background-color: #40a9ff;
}
</style>
