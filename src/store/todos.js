import { ascendingPriorities, descendingPriorities } from '@/utils'
import { defineStore } from 'pinia'

const LOCAL_STORAGE_KEY = 'todos'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
    isAscending: false
  }),

  actions: {
    toggleSortingOrder() {
      this.isAscending = !this.isAscending
    },

    async saveToPersistentStorage() {
      try {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      } catch (error) {
        // Printing to the console, should ideally be logging it to sentry/datadog logs
        console.error('Failed to save todos to persistent storage.')
      }
    },

    async addTodo(description, priority) {
      if (!description) {
        throw new Error('Missing a description. It is a required field.')
      }
      if (!priority) {
        throw new Error('Missing a priority. It is a required field.')
      }
      if (!descendingPriorities.includes(priority)) {
        throw new Error('Invalid priority')
      }

      const todo = {
        id: Date.now(),
        description,
        priority
      }

      this.todos.push(todo)
      await this.saveToPersistentStorage()
      return { todo, message: 'Todo added successfully!' }
    },

    async deleteTodo(id) {
      if (!id) {
        throw new Error('This todo is missing an id. Try refreshing the page and deleting again.')
      }
      const todos = this.todos.filter((todo) => todo.id !== id)
      if (todos.length === this.todos.length) {
        throw new Error('Todo not found. Do you wish to add a new Todo instead?')
      }
      this.todos = todos
      await this.saveToPersistentStorage()
      return { todos, message: 'Todo deleted successfully!' }
    },

    async clearAll() {
      const todos = []
      this.todos = todos
      await this.saveToPersistentStorage()
      return { todos, message: 'All todos deleted successfully!' }
    },

    async editTodo(id, description, priority) {
      if (!id) {
        throw new Error(
          'This todo is missing an id. Try refreshing the page and editing again or try adding a new one.'
        )
      }
      if (!description) {
        throw new Error('Missing a description. It is a required field.')
      }
      if (!priority) {
        throw new Error('Missing a priority. It is a required field.')
      }

      if (!descendingPriorities.includes(priority)) {
        throw new Error('Invalid priority value.')
      }

      if (typeof id === 'string') {
        id = Number(id)
      }

      const todo = this.todos.find((todo) => todo.id === id)
      if (!todo) {
        throw new Error('Todo not found. Do you wish to add a new Todo instead?')
      }
      Object.assign(todo, {
        description,
        priority
      })

      this.saveToPersistentStorage()
      return { todo, message: 'Todo updated successfully!' }
    }
  },

  getters: {
    sortedTodos: (state) => () => {
      const priorityOrder = state.isAscending ? ascendingPriorities : descendingPriorities

      return state.todos.slice().sort((a, b) => {
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      })
    },
    getTodoById: (state) => (id) => {
      if (typeof id === 'string') {
        id = Number(id)
      }
      const todo = state.todos.find((todo) => {
        console.log('todo', typeof todo.id, typeof id, todo.id === id)
        return todo.id === id
      })
      if (!todo) {
        throw new Error('Todo not found. Do you wish to add a new Todo instead?')
      }
      return todo
    }
  }
})
