<script setup lang="ts">
const route = useRoute();
const { $client } = useNuxtApp();
const {
  data: badges,
  pending,
  error,
} = $client.badge.useQuery({
  slug: route.params.slug.toString(),
  posts: true,
});
</script>

<template>
  <loading-error :error="error" :pending="pending">
    <div v-for="badge in badges" :key="badge.id">
      <page-header>{{ badge.title }}</page-header>

      <div class="mx-10 grid grid-cols-1 gap-10 py-10">
        <badge-detail
          :badge="badge"
          :enable-link="false"
          class="flex place-content-center pt-10"
        />
      </div>

      <div v-if="badge?.posts">
        <page-header>Related Posts</page-header>
        <div
          class="mx-10 my-10 grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-2"
        >

        <post-item v-for="post in badge?.posts" :key="post.id" :post="post" class="w-120 card bg-base-200 shadow-xl"/>

        </div>
      </div>
    </div>
  </loading-error>
</template>
