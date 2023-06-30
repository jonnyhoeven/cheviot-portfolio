<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { $client } = useNuxtApp()
const { data: posts, pending, error } = $client.post.useQuery({ limit: 1 })
</script>

<template>
  <loading-error :pending="pending" :error="error">
    <debug-view>
      {{ posts }}
    </debug-view>
  </loading-error>
</template>
