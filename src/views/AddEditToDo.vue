<script setup>
import IconGoBack from '@/components/icons/IconGoBack.vue'
import LinkButton from '@/components/widgets/LinkButton.vue'
import ToDoForm from '../components/ToDoForm.vue'
</script>
<template>
  <main class="page-wrapper">
    <nav>
      <LinkButton data-testid="go-to-list-page" :to="{ name: 'to-do-list' }">
        <IconGoBack /> Go back to To Do list
      </LinkButton>
    </nav>

    <ToDoForm />
  </main>
</template>

<style></style>
