<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <page-header>Posts by type</page-header>
    <post-list :frontpage="false" :limit="20" :type="route.params.type.toString()" />
  </div>
</template>
