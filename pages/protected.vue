<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { data: session, signOut } = useSession()
</script>

<template>
  <div>
    <div v-if="session" class="flex">
      Hi there, {{ session?.user?.name }}!
      <img
        class="border-2 border-gray-900 rounded-full w-8 h-8  shadow-xl"
        :src="session?.user?.image?.toString()"
      >
      <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
        sign out
      </button>
    </div>
    <pre>{{ session }}</pre>
  </div>
</template>
