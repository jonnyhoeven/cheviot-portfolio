<script setup lang="ts">
import { Badge } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  badge: Badge;
  disableLink?: boolean;
}>()
</script>
<template>
  <span
    :style="{
      backgroundColor: badge.color || 'gray',
      borderColor: badge.borderColor || badge.color || 'gray',
      color: badge.textColor || 'white',
    }"
    class="badge badge-lg mr-2"
  >
    <div>
      <nuxt-link v-if="!disableLink" :to="`/badges/${badge.slug}`">
        <div
          :style="{ backgroundColor: badge.textColor || 'gray' }"
          class="w-8 bg-base-content pointer-events-none absolute aspect-square rounded-full opacity-80 blur-lg"
        />
        {{ badge.title }}
      </nuxt-link>
      <span v-else>{{ badge.title }}</span>
    </div>
  </span>
</template>
