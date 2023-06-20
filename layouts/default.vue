<script setup lang="ts">
import { MenuItem } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  strings: { [key: string]: string };
  menuItems: MenuItem[];
}>()
</script>

<template>
  <main>
    <NuxtLoadingIndicator :throttle="20" :height="3" color="#33790f" />
    <slot />
  </main>
</template>
