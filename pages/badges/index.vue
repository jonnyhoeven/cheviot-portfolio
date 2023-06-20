<script setup lang="ts">
const { $client } = useNuxtApp();
const {
  data: badges,
  pending,
  error,
} = $client.badge.useQuery({ limit: 10, posts: false });
</script>

<template>
  <div>
    <page-header>Badges</page-header>
    <loading-error :error="error" :pending="pending">
      <div class="mx-10 grid grid-cols-1 gap-10 py-10">
        <badge-detail
          v-for="badge in badges"
          :key="`badgedetail${badge.id}`"
          :badge="badge"
        />
      </div>
    </loading-error>
  </div>
</template>
