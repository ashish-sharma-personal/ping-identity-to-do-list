import IconCriticalPriority from '@/components/icons/IconCriticalPriority.vue'
import IconModeratePriority from '@/components/icons/IconModeratePriority.vue'
import IconOptionalPriority from '@/components/icons/IconOptionalPriority.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const priorityConfig = {
  critical: {
    label: 'Critical',
    icon: IconCriticalPriority,
    cssClass: 'critical'
  },
  moderate: {
    label: 'Moderate',
    icon: IconModeratePriority,
    cssClass: 'moderate'
  },
  optional: {
    label: 'Optional',
    icon: IconOptionalPriority,
    cssClass: 'optional'
  }
}

export const ascendingPriorities = ['optional', 'moderate', 'critical']
export const descendingPriorities = ['critical', 'moderate', 'optional']

export const getTodoIdFromRoute = () => {
  const route = useRoute()
  const isNewTodo = computed(() => route.params.id === 'new')
  return {
    isNewTodo,
    id: isNewTodo.value ? null : Number(route.params.id)
  }
}
