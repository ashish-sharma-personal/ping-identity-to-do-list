import { createRouter, createWebHistory } from 'vue-router'
import ToDoListView from '../views/ToDoList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'to-do-list',
      component: ToDoListView
    },
    {
      path: '/to-do/:id',
      name: 'to-do',
      component: () => import('../views/AddEditToDo.vue')
    }
  ]
})

export default router
