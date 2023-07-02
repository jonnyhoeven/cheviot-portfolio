<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
definePageMeta({ middleware: 'auth' })
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <client-only>
    <div>Logged in:</div>
    <nuxt-link to="/admin/posts">
      Posts
    </nuxt-link>
    <pre>{{ user }}</pre>
  </client-only>
</template>
