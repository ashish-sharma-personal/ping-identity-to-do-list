import { useTodoStore } from '@/store/todos'
import { ascendingPriorities } from '@/utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

const getMockedLocalStorage = () => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    clear: () => (store = {})
  }
}

describe('Todos Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTodoStore()

    window.localStorage = getMockedLocalStorage()
  })

  it('toggles sorting order', () => {
    store.toggleSortingOrder()
    expect(store.isAscending).toBe(true)
  })

  it('addTodo > should add a new todo', async () => {
    const description = 'New Todo'
    const priority = ascendingPriorities[0]
    const response = await store.addTodo(description, priority)

    expect(store.todos.length).toBe(1)
    expect(store.todos[0]).toMatchObject({ description, priority })
    expect(response.message).toBe('Todo added successfully!')
  })

  it('addTodo > should throw error if no description', async () => {
    await expect(store.addTodo('', ascendingPriorities[0])).rejects.toThrow(
      'Missing a description. It is a required field.'
    )
  })

  it('addTodo > should throw error if no priority', async () => {
    await expect(store.addTodo('Some text')).rejects.toThrow(
      'Missing a priority. It is a required field.'
    )
  })

  it('addTodo > should throw error if invalid priority', async () => {
    await expect(store.addTodo('Some text', "won't do")).rejects.toThrow('Invalid priority')
  })

  it('deleteTodo > should delete a todo for the id passed', async () => {
    const id = Date.now()
    const todo = { id, description: 'Some text', priority: ascendingPriorities[0] }
    store.todos.push(todo)

    const response = await store.deleteTodo(id)
    expect(store.todos.length).toBe(0)
    expect(response.message).toBe('Todo deleted successfully!')
  })

  it('deleteTodo > should throw error when no id', async () => {
    await expect(store.deleteTodo('')).rejects.toThrow(
      'This todo is missing an id. Try refreshing the page and deleting again.'
    )
  })

  it('editTodo > should edit a todo for the id passed', async () => {
    const id = Date.now()
    const todo = { id, description: 'Some text', priority: ascendingPriorities[0] }
    store.todos.push(todo)

    const description = 'New text'
    const priority = ascendingPriorities[2]

    const response = await store.editTodo(id, description, priority)

    expect(store.todos[0].description).toBe(description)
    expect(store.todos[0].priority).toBe(priority)
    expect(response.message).toBe('Todo updated successfully!')
  })

  it("editTodo > should throw error if todo doesn't exist with the id passed", async () => {
    await expect(
      store.editTodo(Math.random(), 'Some text', ascendingPriorities[1])
    ).rejects.toThrow('Todo not found. Do you wish to add a new Todo instead?')
  })

  it('getTodoById > should return a todo for id passed', () => {
    const id = Date.now()
    const todo = { id, description: 'Some text', priority: ascendingPriorities[0] }
    store.todos.push(todo)

    const retrievedTodo = store.getTodoById(id)
    expect(retrievedTodo).toEqual(todo)
  })

  it("getTodoById > should throw error todo doesn't exist with the id passed", () => {
    expect(() => store.getTodoById(Date.now())).toThrow(
      'Todo not found. Do you wish to add a new Todo instead?'
    )
  })

  it('sortedTodos > should sort todos by priority in ascending order', () => {
    store.todos = [
      { id: Date.now(), description: 'Some text 1', priority: ascendingPriorities[2] },
      { id: Date.now(), description: 'Some text 2', priority: ascendingPriorities[1] },
      { id: Date.now(), description: 'Some text 3', priority: ascendingPriorities[0] }
    ]

    store.toggleSortingOrder()

    const sortedTodos = store.sortedTodos()

    expect(sortedTodos[0].priority).toBe(ascendingPriorities[0])
    expect(sortedTodos[1].priority).toBe(ascendingPriorities[1])
    expect(sortedTodos[2].priority).toBe(ascendingPriorities[2])
  })

  it('sortedTodos > should sort todos by priority in descending order', () => {
    store.todos = [
      { id: Date.now(), description: 'Some text', priority: ascendingPriorities[0] },
      { id: Date.now(), description: 'Some text', priority: ascendingPriorities[1] },
      { id: Date.now(), description: 'Some text', priority: ascendingPriorities[2] }
    ]

    const sortedTodos = store.sortedTodos()

    expect(sortedTodos[0].priority).toBe(ascendingPriorities[2])
    expect(sortedTodos[1].priority).toBe(ascendingPriorities[1])
    expect(sortedTodos[2].priority).toBe(ascendingPriorities[0])
  })

  it('clearAll > should clear all todos', async () => {
    store.todos = [{ id: Date.now(), description: 'Some text', priority: ascendingPriorities[0] }]

    const { message } = await store.clearAll()

    expect(store.todos.length).toBe(0)
    expect(message).toBe('All todos deleted successfully!')
  })
})
