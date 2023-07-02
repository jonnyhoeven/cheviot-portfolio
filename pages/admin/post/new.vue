<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>
<template>
  <div>
    <h1>Create new post</h1>
    <post-form :id="0" />
  </div>
</template>
