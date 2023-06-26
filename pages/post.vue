<script setup lang="ts">
import { FormInst, useMessage } from 'naive-ui'
import { Post, Prisma } from '@prisma/client'

const formValue: Prisma.PostCreateInput = {}

const formRef = ref<FormInst | null>(null)

const message = useMessage()

const rules = {
  title: [
    { required: true, message: 'Title is required' },
    { min: 3, message: 'Title must be at least 3 characters' },
    { max: 30, message: 'Title must be at most 30 characters' }
  ]
}

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}

</script>
<template>
  <div>
    <n-form
      ref="formRef"
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
      :model="formValue"
      :rules="rules"
      :style="{
        maxWidth: '640px'
      }"
    >
      <n-form-item label="Title" path="title">
        <n-input v-model:value="formValue.title" placeholder="Title" />
      </n-form-item>

      <n-button @click="handleValidateClick">
        Save
      </n-button>
    </n-form>

    <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
  </div>
</template>
