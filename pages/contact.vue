<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  strings: { [key: string]: string };
}>()
</script>

<template>
  <div>
    <div class="mx-10 grid place-content-center pt-10">
      <contact-form :strings="strings" />
    </div>
  </div>
</template>
