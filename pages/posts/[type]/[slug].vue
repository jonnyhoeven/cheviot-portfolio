<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>
    <page-header>Posts detail</page-header>
    {{route.params.slug.toString()}}
    <post-list
      :frontpage="false"
      :limit="1"
      :type="route.params.type.toString()"
      :slug="route.params.slug.toString()"
    />
  </div>
</template>
