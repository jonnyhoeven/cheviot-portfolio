<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const id = parseInt(route.params?.id?.toString())
</script>

<template>
  <ClientOnly>
    <h1>Update post: {{ id }}</h1>
    <post-form :id="id" />
  </ClientOnly>
</template>
