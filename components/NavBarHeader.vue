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
    <nuxt-link
      v-if="!user?.active"
      to="/profile"
    >
      <n-button
        class="btn btn-primary"
      >
        Sign in
      </n-button>
    </nuxt-link>

    <div v-if="user.role ==='ADMIN'">
      <nuxt-link
        to="/admin/posts"
      >
        Posts
      </nuxt-link>
      <nuxt-link
        to="/admin/post/new"
      >
        New Post
      </nuxt-link>
    </div>

    <n-button
      v-if="user?.active"
      class="btn btn-primary"
      @click="signOut()"
    >
      Sign out
    </n-button>

    <nuxt-link
      v-if="user?.active"
      to="/profile"
    >
      <img
        v-if="user?.image"
        class="border-2 border-gray-900 dark:border-gray-100 rounded-full w-8 h-8 shadow-sm"
        :class=" {ADMIN: user?.role === 'ADMIN', USER: user?.role === 'USER'} "
        :src="user?.image"
      >
    </nuxt-link>
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
