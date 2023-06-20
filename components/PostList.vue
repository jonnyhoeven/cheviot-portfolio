<script setup lang="ts">
const props = defineProps<{
  frontpage?: boolean;
  type?: string;
  slug?: string;
  limit?: number;
}>()
const { $client } = useNuxtApp()
const {
  data: posts,
  pending,
  error
} = $client.post.useQuery({ frontpage: props.frontpage, type: props.type, slug: props.slug, limit: props.limit })
</script>

<template>
  <loading-error :error="error" :pending="pending">
    <div
      class="mx-10 my-10 grid grid-cols-1 gap-20 md:grid-cols-1 lg:grid-cols-2"
    >
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        class="w-120 card bg-base-200 shadow-xl"
      />
    </div>
  </loading-error>
</template>
