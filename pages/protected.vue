<template>
  <div>
    <div class="flex">
      Hi there, {{ data?.user?.name }}!
      <img
        class="border-2 border-gray-900 rounded-full w-8 h-8  shadow-xl"
        :src="data?.user?.image?.toString()"
      >
      <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
        sign out
      </button>
    </div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { data, signOut } = useSession()
</script>
