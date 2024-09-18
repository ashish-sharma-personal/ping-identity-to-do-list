<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img
      alt="Ping Identity logo"
      class="logo"
      src="https://www.pingidentity.com/content/dam/picr/nav/Ping-Logo-2.svg"
    />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  height: 2em;
  display: flex;
}
</style>
