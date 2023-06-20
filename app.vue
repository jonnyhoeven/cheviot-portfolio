<script setup lang="ts">
const { $client } = useNuxtApp()
const { data, pending, error } = $client.globalSetting.useQuery()
useHead({
  title: 'jcodes.nl - cloud run test deployment'
})
</script>

<template>
  <loading-error :error="error" :pending="pending">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </loading-error>
</template>
