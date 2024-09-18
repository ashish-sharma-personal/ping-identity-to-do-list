<script setup>
import { defineProps } from 'vue'

defineProps(['label', 'to'])
</script>

<template>
  <RouterLink class="router-link" :to="to"> <slot></slot> </RouterLink>
</template>

<style scoped>
.router-link {
  padding: 8px 12px;
  margin: 10px;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.router-link:hover {
  background-color: #40a9ff;
}
</style>
