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
    <span v-if="pending" class="loading loading-ball loading-md" />
    <slot v-else />
    <div class="flex  justify-center">
      <n-alert v-if="error" title="Whoops " type="error">
        {{ error.message || error }} 🫠
      </n-alert>
    </div>
  </div>
</template>
