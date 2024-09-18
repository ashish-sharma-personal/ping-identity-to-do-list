<script setup>
import { priorityConfig } from '@/utils'
import { defineProps } from 'vue'
import CommonButton, { ButtonStyle } from './widgets/CommonButton.vue'
import LinkButton from './widgets/LinkButton.vue'

const props = defineProps(['todo', 'onDelete'])
const { todo, onDelete } = props
</script>
<template>
  <div class="todo-list-item">
    <h3 class="description">{{ todo.description }}</h3>
    <div class="details">
      <p class="priority">
        Priority: <component :is="priorityConfig[todo.priority].icon" />
        <span :class="priorityConfig[todo.priority].cssClass">
          {{ priorityConfig[todo.priority].label }}</span
        >
      </p>

      <div class="actions">
        <CommonButton
          label="Delete"
          :style="ButtonStyle.danger"
          :onClick="() => onDelete(todo.id)"
        />

        <LinkButton :to="{ name: 'to-do', params: { id: todo.id } }">Edit</LinkButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-list-item {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.todo-list-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.description {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.priority {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  gap: 8px;
  align-items: center;
}

.priority span {
  padding: 2px 4px;
  border-radius: 8px;
  color: #fff;
  font-size: 11px;
}

.priority .critical {
  background-color: #ff4d4f;
}

.priority .moderate {
  background-color: #faad14;
}

.priority .optional {
  background-color: #52c41a;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-link {
  padding: 8px 12px;
  margin: 10px;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.edit-link:hover {
  background-color: #40a9ff;
}
</style>
