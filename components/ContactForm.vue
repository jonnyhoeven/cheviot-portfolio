<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  strings: { [key: string]: string };
}>()
</script>

<template>
  <div v-if="strings" class="form-control mb-20 w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ strings?.contact_email_label }}</span>
    </label>
    <input
      type="email"
      :placeholder="strings?.contact_email_placeholder"
      class="input-bordered input mb-5 w-full max-w-xs"
    >

    <label class="label">
      <span class="label-text">{{ strings?.contact_subject_label }}</span>
    </label>
    <input
      type="text"
      :placeholder="strings?.contact_subject_placeholder"
      class="input-bordered input mb-5 w-full max-w-xs"
    >

    <label class="label">
      <span class="label-text">{{ strings?.contact_message_label }}</span>
    </label>
    <textarea
      id="message"
      rows="6"
      class="input-bordered input mb-5 h-32 w-full max-w-xs"
      :placeholder="strings?.contact_message_placeholder"
    />

    <button type="submit" class="btn-primary btn mt-4">
      {{ strings?.contact_button_label }}
    </button>
  </div>
</template>
