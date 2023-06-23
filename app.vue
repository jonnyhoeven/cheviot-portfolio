<script setup lang="ts">
useHead({
  title: 'JustMe.dev Jonny van der Hoeven',
  link: [
    { rel: 'icon', href: 'favicon.ico', sizes: 'any' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
