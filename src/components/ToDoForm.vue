<script setup>
import { useTodoStore } from '@/store/todos'
import { descendingPriorities, getTodoIdFromRoute, priorityConfig } from '@/utils'
import { computed, onMounted, ref } from 'vue'
import CommonButton from './widgets/CommonButton.vue'
import NotificationBanner, { NotificationType } from './widgets/NotificationBanner.vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const todoStore = useTodoStore()
const todo = ref({ description: '', priority: '' })
const { id, isNewTodo } = getTodoIdFromRoute()

const notificationMessage = ref('')
const notificationType = ref('')

onMounted(() => {
  if (isNewTodo.value) {
    return
  }
  const existingTodo = todoStore.getTodoById(id)
  if (existingTodo) {
    todo.value = { ...existingTodo }
  } else {
    isNewTodo.value = true
  }
})

const isFormValid = computed(() => {
  return todo.value.description.trim() !== '' && todo.value.priority !== ''
})

const onSubmit = async () => {
  notificationMessage.value = ''
  notificationType.value = ''
  try {
    if (isNewTodo.value) {
      const { message } = await todoStore.addTodo(todo.value.description, todo.value.priority)
      notificationMessage.value = message
    } else {
      const { message } = await todoStore.editTodo(id, todo.value.description, todo.value.priority)
      notificationMessage.value = message
    }
    notificationType.value = NotificationType.success
    todo.value = { description: '', priority: '' }
    // router.push('/')
  } catch (error) {
    notificationType.value = NotificationType.error
    notificationMessage.value = error
  }
}
</script>

<template>
  <NotificationBanner
    class="notification-bar"
    :message="notificationMessage"
    :type="notificationType"
  />

  <h2 class="section-heading">{{ isNewTodo ? 'Add New Todo' : 'Edit Todo' }}</h2>

  <form @submit.prevent="onSubmit" class="todo-form">
    <div class="form-group">
      <label for="description">Description</label>
      <input
        autocomplete="off"
        type="text"
        v-model="todo.description"
        placeholder="Enter todo description"
        required
      />
    </div>

    <div class="form-group">
      <label for="priority">Priority <component :is="priorityConfig[todo.priority]?.icon" /></label>

      <select v-model="todo.priority" required>
        <option value="" disabled>Select priority</option>
        <option v-for="priority in descendingPriorities" :key="priority" :value="priority">
          {{ priorityConfig[priority].label }}
        </option>
      </select>
    </div>

    <CommonButton :is-disabled="!isFormValid" :label="isNewTodo ? 'Add Todo' : 'Update Todo'" />
  </form>
</template>

<style scoped>
.notification-bar {
  margin: 20px 0;
}
.section-heading {
  text-align: center;
  margin-bottom: 20px;
}

.todo-form {
  display: flex;
  flex-direction: column;
  padding: 0 72px;
}

.form-group {
  margin-bottom: 15px;
}

.priority-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

input,
select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

input:focus,
select:focus {
  border-color: #1890ff;
  outline: none;
}
</style>
