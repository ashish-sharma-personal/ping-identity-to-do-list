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
    const { message } = await todoStore.deleteTodo(todoId)
    notificationType.value = NotificationType.success
    notificationMessage.value = message
  } catch (caughtError) {
    notificationType.value = NotificationType.error
    notificationMessage.value = caughtError
  }
}

const onClearAll = async () => {
  notificationMessage.value = ''
  notificationType.value = ''
  try {
    const { message } = await todoStore.clearAll()
    notificationType.value = NotificationType.success
    notificationMessage.value = message
  } catch (caughtError) {
    notificationType.value = NotificationType.error
    notificationMessage.value = caughtError
  }
}

const sortedTodos = computed(() => todoStore.sortedTodos())
</script>

<template>
  <h2 class="section-heading">Todo List</h2>

  <NotificationBanner :message="notificationMessage" :type="notificationType" />

  <div class="action-bar">
    <div class="actions">
      <CommonButton
        data-testid="toggle-sort-order"
        :is-disabled="!sortedTodos.length"
        label="Toggle Sort Order"
        @click="todoStore.toggleSortingOrder"
      />
      <CommonButton
        data-testid="clear-all"
        :is-disabled="!sortedTodos.length"
        label="Clear All Todos"
        @click="onClearAll"
      />
    </div>

    <LinkButton data-testid="add-new-todo" to="/to-do/new">Add New Todo</LinkButton>
  </div>

  <ToDoListItem v-for="todo in sortedTodos" :key="todo.id" :todo="todo" @delete="onDelete" />
</template>

<style scoped>
.section-heading {
  text-align: center;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
