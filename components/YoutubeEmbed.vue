<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  src: string;
  title: string;
}>()
</script>

<template>
  <iframe
    class="rounded-xl shadow-xl"
    width="560"
    height="315"
    :src="src"
    :title="title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  />
</template>
