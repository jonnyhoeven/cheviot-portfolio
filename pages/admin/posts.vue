<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { $client } = useNuxtApp()
// const { data: posts, pending, error } = $client.post.useQuery({ limit: 1 })
const { data, pending, error } = await $client.admin.allPosts.useQuery({ limit: 30 })

</script>
<template>
  <loading-error :error="error" :pending="pending">
    List all...
    {{ data }}
  </loading-error>
</template>
