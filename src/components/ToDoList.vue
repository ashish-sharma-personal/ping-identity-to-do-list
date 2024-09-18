<script setup>
import { useTodoStore } from '@/store/todos'
import { computed, ref } from 'vue'
import ToDoListItem from './ToDoListItem.vue'
import CommonButton from './widgets/CommonButton.vue'
import LinkButton from './widgets/LinkButton.vue'
import NotificationBanner, { NotificationType } from './widgets/NotificationBanner.vue'

const todoStore = useTodoStore()

const notificationMessage = ref('')
const notificationType = ref('')

const onDelete = async (todoId) => {
  notificationMessage.value = ''
  notificationType.value = ''
  try {
    await todoStore.deleteTodo(todoId)
    notificationType.value = NotificationType.success
    notificationMessage.value = 'Todo deleted successfully!'
  } catch (caughtError) {
    notificationType.value = NotificationType.error
    notificationMessage.value = caughtError
  }
}

const sortedTodos = computed(() => todoStore.sortedTodos())

const toggleSortOrder = todoStore.setSortingOrder
</script>

<template>
  <h2 class="section-heading">Todo List</h2>

  <NotificationBanner :message="notificationMessage" :type="notificationType" />

  <div class="actions">
    <CommonButton
      :is-disabled="!sortedTodos.length"
      label="Toggle Sort Order"
      :onclick="toggleSortOrder"
    />

    <LinkButton to="/to-do/new">Add New Todo</LinkButton>
  </div>

  <ToDoListItem v-for="todo in sortedTodos" :key="todo.id" :todo="todo" :onDelete="onDelete" />
</template>

<style scoped>
.section-heading {
  text-align: center;
  font-size: 24px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
}
</style>
