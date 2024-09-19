import NotificationBanner, { NotificationType } from '@/components/widgets/NotificationBanner.vue'
import { mockedTodos, mockTodosStore } from '@/store/__tests__/mock.todos'
import { useTodoStore } from '@/store/todos'
import { mount } from '@vue/test-utils'
// Need to make sure to import TodoList after importing the mock store
import TodoList from '@/components/ToDoList.vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('TodoList Component', () => {
  let store

  beforeEach(() => {
    store = mockTodosStore()
  })

  it('should mount the component', () => {
    const wrapper = mount(TodoList)
    expect(wrapper.text()).toContain('Todo List')
  })

  it('should call deleteTodo and display a successful delete notification', async () => {
    const wrapper = mount(TodoList)
    const todoItem = wrapper.findComponent({ name: 'ToDoListItem' })
    await todoItem.vm.$emit('delete', mockedTodos[0].id)

    expect(store.deleteTodo).toHaveBeenCalled(mockedTodos[0].id)

    const notificationBanner = wrapper.findComponent(NotificationBanner)
    expect(notificationBanner.props('message')).toBe('Deleted successfully')
    expect(notificationBanner.props('type')).toBe(NotificationType.success)
  })

  it('should display error notification when delete fails', async () => {
    store.deleteTodo.mockRejectedValue('Some failure message')
    const wrapper = mount(TodoList)
    const todoItem = wrapper.findComponent({ name: 'ToDoListItem' })
    await todoItem.vm.$emit('delete', mockedTodos[0].id)

    const notificationBanner = wrapper.findComponent(NotificationBanner)
    expect(notificationBanner.props('message')).toBe('Some failure message')
    expect(notificationBanner.props('type')).toBe(NotificationType.error)
  })

  it('should call clearAll when "Clear All" is clicked', async () => {
    const wrapper = mount(TodoList)
    const clearAllButton = wrapper.find('button[data-testid="clear-all"]')
    await clearAllButton.trigger('click')

    expect(store.clearAll).toHaveBeenCalled()
  })

  it('should call toggleSortingOrder when "Toggle Sort Order" is clicked', async () => {
    const wrapper = mount(TodoList)
    const clearAllButton = wrapper.find('button[data-testid="toggl-sort-order"]')
    await clearAllButton.trigger('click')

    expect(store.toggleSortingOrder).toHaveBeenCalled()
  })

  it('should disable the toggle sort button if no todos', () => {
    useTodoStore.mockReturnValue({
      sortedTodos: vi.fn(() => [])
      // deleteTodo: vi.fn(),
      // clearAll: vi.fn(),
      // toggleSortingOrder: vi.fn()
    })
    const wrapper = mount(TodoList)
    const toggleSortButton = wrapper.find('button[data-testid="toggl-sort-order"]')

    expect(toggleSortButton.attributes('disabled')).toBe('')
  })
})
