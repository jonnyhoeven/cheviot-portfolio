<script setup lang="ts">
import { TRPCError } from '@trpc/server'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  error: Error | TRPCError | null | any;
  pending: boolean;
}>()
</script>

<template>
  <div>
    <div v-if="error">
      <div class="alert alert-error mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ error.message }}
      </div>
      <debug-view>
        {{ error }}
      </debug-view>
    </div>
    <span v-if="pending" class="loading loading-ball loading-md" />
    <slot v-else />
  </div>
</template>
