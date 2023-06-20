<script setup lang="ts">
import { Post, Badge, PostType } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  post: Post & { badges: Badge[]; type: PostType };
}>()
</script>

<template>
  <div class="max-auto overflow-hidden rounded-xl bg-base-100">
    <div class="md:flex">
      <div class="card-body">
        <h2 class="card-title">
          {{ post.title }}
        </h2>
        <div v-if="post.badges" class="flex">
          <badge-item v-for="badge in post.badges" :key="badge.id" :badge="badge" />
        </div>
        <h3>{{ post.subtitle }}</h3>
        <article
          class="prose max-w-none dark:prose-invert md:prose-lg lg:prose-xl"
        />
        <p>{{ post.intro }}</p>
        <figure v-if="post.imageUrl">
          <img
            :src="post.imageUrl"
            :alt="post.imageAlt ? post.imageAlt : post.title"
          >
          {{ post.badges }}
        </figure>
        <p>{{ post.content }}</p>
        <div class="card-actions justify-end" />
      </div>
    </div>
  </div>
</template>
