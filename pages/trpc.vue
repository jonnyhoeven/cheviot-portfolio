<script setup lang="ts">
const { $client } = useNuxtApp()
const { data: posts, pending, error } = $client.test.useQuery({ limit: 1 })
</script>

<template>
  <loading-error :pending="pending" :error="error">
    <debug-view v-if="true">
      {{ posts }}
    </debug-view>
  </loading-error>
</template>
