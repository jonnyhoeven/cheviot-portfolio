<script setup lang="ts">
import { MenuItem } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  strings: { [key: string]: string };
  menuItems: MenuItem[];
}>()
</script>

<template>
  <footer
    class="footer footer-center rounded bg-base-200 p-10 text-base-content"
  >
    <div class="grid grid-flow-col gap-4 pb-4">
      <nuxtLink
        v-for="menuItem in menuItems"
        :key="`footerbar-${menuItem.id}`"
        :to="menuItem.link"
        class="link-hover link"
      >
        {{ menuItem.title }}
      </nuxtLink>
    </div>
    <div>
      <p v-if="strings">
        © 2023
        <nuxtLink :to="strings.base_url" class="hover:underline">
          {{ strings.title }}
        </nuxtLink>
        - all rights reserved.
      </p>
    </div>
  </footer>
</template>
