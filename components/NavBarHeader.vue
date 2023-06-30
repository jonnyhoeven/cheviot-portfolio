<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const { signOut } = useSession()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div
    class="flex justify-end w-screen gap-2 pt-2 pr-2 h-1"
  >
    <client-only>
      <button
        v-if="user?.active"
        class="btn btn-primary"
        @click="signOut()"
      >
        Sign out
      </button>
      <img
        v-if="user?.active && user?.image"
        class="border-2 border-gray-900 dark:border-gray-100 rounded-full w-8 h-8 shadow-sm"
        :class=" {ADMIN: user?.role === 'ADMIN', USER: user?.role === 'USER'} "
        :src="user?.image"
      >
    </client-only>
  </div>
</template>

<style scoped>
.ADMIN {
  border-color: red;
}
.USER {
  border-color: blue;
}
</style>
