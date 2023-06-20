<script setup lang="ts">
import { Post, Badge, PostType } from '@prisma/client'

const props = defineProps<{
  badge: Badge & {
    posts:(
      | Post
      | (Post & {
          type: PostType;
          badges: Badge[];
        })
    )[];
  };
  index: number;
}>()
</script>

<template>
  <div :class="{ 'col-span-2': index === 0, 'text-center p-10': true }">
    <nuxt-link :to="`/badges/${badge.slug}`">
      <Icon
        :key="badge.id"
        :name="badge.icon"
        :class="{ 'animate-pulse ': index === 0 }"
        :size="index === 0 ? '4em' : '3em'"
      />
      <div v-if="index === 0" class="text-xl pt-4 font-bold">
        {{ badge.title }}<br>
        <small>{{ badge.subtitle }}</small>
      </div>
      <div v-else class="text-center pt-2">
        {{ badge.title }}
      </div>
    </nuxt-link>
  </div>
</template>
