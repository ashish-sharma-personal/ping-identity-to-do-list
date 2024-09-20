import { useTodoStore } from '@/store/todos'
import { ascendingPriorities } from '@/utils'
import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'

vi.mock('@/store/todos', () => ({
  useTodoStore: () => ({
    deleteTodo: vi.fn().mockResolvedValue({ message: 'Todo deleted successfully' }),
    clearAll: vi.fn().mockResolvedValue({ message: 'All todos cleared' }),
    sortedTodos: vi.fn(() => mockedTodos),
    toggleSortingOrder: vi.fn()
  })
}))

export const mockedTodos = [
  { id: 0, description: 'Some text for Todo 1', priority: ascendingPriorities[0] },
  { id: 1, description: 'Some text for Todo 2', priority: ascendingPriorities[1] }
]

let store

export const mockTodosStore = () => {
  setActivePinia(createPinia())
  store = store ? store : useTodoStore()
  return store
}
