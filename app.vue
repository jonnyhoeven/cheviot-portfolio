<script setup lang="ts">
useHead({
  title: 'JustMe.dev',
  link: [
    { rel: 'icon', href: 'favicon.ico', sizes: 'any' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})
</script>

<template>
  <NConfigProvider>
    <n-message-provider>
      <NGlobalStyle />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
  </NConfigProvider>
</template>
