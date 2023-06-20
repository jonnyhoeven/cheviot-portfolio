<script setup lang="ts">
import { Post, Badge, PostType } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  post: Post & { type: PostType; badges: Badge[] };
}>()
</script>

<template>
  <div>
    <figure v-if="post.imageUrl" class="max-h-56">
      <img
        :src="post.imageUrl"
        :alt="post.imageAlt ? post.imageAlt : post.title"
      >
    </figure>
    <div class="card-body">
      <div
        v-if="post.type"
        style="position: absolute; top: 10pt; right: 10pt; text-align: right"
        class="w-32 text-sm font-extrabold uppercase text-zinc-500"
      >
        <nuxt-link :to="`/posts/${post.type.slug}`">
          {{ post.type.title || "n/a" }}
        </nuxt-link>
      </div>

      <h2 class="card-title">
        {{ post.title }}
      </h2>
      <div v-if="post.badges" class="flex">
        <badge-item
          v-for="badge in post.badges"
          :key="badge.id"
          :badge="badge"
        />
      </div>
      <p
        class="md:prose-md prose max-w-none pb-2 dark:prose-invert lg:prose-lg"
      >
        {{ post.intro }}
      </p>
      <div
        class="h-3/4 bg-base-content top-2/4 left-2/4 pointer-events-none absolute aspect-square rounded-full border-2 opacity-5 blur-3xl"
      >
        mid
      </div>

      <div class="card-actions justify-end">
        <nuxt-link
          v-if="post.type"
          :to="`/posts/${post.type.slug}/${post.slug}`"
          class="btn-primary btn"
        >
          Read More
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
