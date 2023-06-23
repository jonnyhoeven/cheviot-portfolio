<script setup lang="ts">
const { $client } = useNuxtApp()
const { data: posts, pending, error } = $client.test.useQuery({})
</script>

<template>
  <loading-error :pending="pending" :error="error">
    <debug-view v-if="true">
      {{ posts }}
    </debug-view>
  </loading-error>
</template>
