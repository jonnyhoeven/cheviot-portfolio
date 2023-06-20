<script setup lang="ts">
import { Badge } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  badge: Badge;
  disableLink?: boolean;
}>()
</script>

<template>
  <div v-if="badge" class="max-auto overflow-hidden rounded-xl bg-base-100">
    <div class="md:flex">
      <div class="card-body">
        <h2 class="card-title">
          {{ badge.title }}
        </h2>
        <div class="flex" />
        <h3>{{ badge.subtitle }}</h3>
        <badge-item :badge="badge" :disable-link="disableLink" />
        <article
          class="prose max-w-none dark:prose-invert md:prose-lg lg:prose-xl"
        >
          <p>{{ badge.intro }}</p>
          <figure v-if="badge.imageUrl">
            <img
              :src="badge.imageUrl"
              :alt="badge.imageAlt ? badge.imageAlt : badge.title"
            >
          </figure>
          <p>{{ badge.content }}</p>
        </article>
        <div class="card-actions justify-end" />
      </div>
    </div>
  </div>
</template>
