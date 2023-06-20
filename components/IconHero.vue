<script setup lang="ts">

const { $client } = useNuxtApp()
const { data: badges } = $client.badge.useQuery({ limit: 1 })
/*
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
} */
</script>

<template>
  <h1
    class="font-title text-left font-black"
  >
    jCodes.nl
    <pre>{{ badges }}</pre>
  </h1>
</template>
