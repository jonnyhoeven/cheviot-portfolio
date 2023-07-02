<script setup lang="ts">
import { useMessage, FormInst } from 'naive-ui'
definePageMeta({ middleware: 'auth' })
const { $client } = useNuxtApp()
const router = useRouter()
const message = useMessage()
const formRef = ref<FormInst | null>(null)

const props = defineProps<{
    id: number;
}>()

const isNew = (props.id === 0)

const { data: formValue, pending, error } = await $client.admin.postById.useQuery({ id: props.id })

// @ts-expect-error
const parseData = formValue => ({
  slug: formValue.value?.slug,
  title: formValue.value?.title,
  published: formValue.value?.published,
  frontpage: formValue.value?.frontpage,
  subtitle: formValue.value?.subtitle,
  intro: formValue.value?.intro,
  content: formValue.value?.content,
  imageUrl: formValue.value?.imageUrl,
  imageAlt: formValue.value?.imageAlt,
  linkUrl: formValue.value?.linkUrl,
  linkLabel: formValue.value?.linkLabel
})

const createPost = () => $client.admin.createPost.useQuery({
  data: parseData(formValue)
})

const updatePost = () => $client.admin.updatePost.useQuery({
  id: props.id,
  data: parseData(formValue)
})

const doUpdate = async () => {
  const { error /* data, status, pending */ } = isNew ? await createPost() : await updatePost()
  if (error.value) {
    message.error(`Error ${error.value}`)
  } else if (isNew) {
    message.success('Record created')
  } else {
    message.success('Record updated')
  }
}

const handleSaveClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      doUpdate()
    } else {
      message.error('Problem validating form')
    }
  })
}

const handleDeleteClick = (e: MouseEvent) => {
  e.preventDefault()
  const { error } = $client.admin.deletePost.useQuery({
    id: props.id
  })
  if (error.value) {
    message.error(`Error ${error.value}`)
  } else {
    message.success('Record deleted')
    router.push('/admin/posts')
  }
}

const rules = {
  slug: [
    { required: true, message: 'Title is required' },
    { min: 3, message: 'Title must be at least 3 characters' },
    { max: 180, message: 'Title must be at most 180 characters' }
  ],
  title: [
    { required: true, message: 'Title is required' },
    { min: 3, message: 'Title must be at least 3 characters' },
    { max: 80, message: 'Title must be at most 80 characters' }
  ],
  subtitle: [
    { required: true, message: 'Subtitle is required' },
    { min: 3, message: 'Subtitle must be at least 3 characters' },
    { max: 180, message: 'Subtitle must be at most 180 characters' }
  ]
}

</script>

<template>
  <loading-error :error="error" :pending="pending">
    <n-form
      v-if="formValue"
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
      <n-form-item label="Slug" path="slug">
        <n-input v-model:value="formValue.slug" placeholder="Slug" />
      </n-form-item>

      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="12" label="Published" path="published">
          <n-checkbox v-model:checked="formValue.published" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Frontpage" path="frontpage">
          <n-checkbox v-model:checked="formValue.frontpage" />
        </n-form-item-gi>
      </n-grid>

      <n-form-item label="Title" path="title">
        <n-input v-model:value="formValue.title" placeholder="Title" />
      </n-form-item>

      <n-form-item label="Subtitle" path="subtitle">
        <n-input v-model:value="formValue.subtitle" placeholder="Subtitle" />
      </n-form-item>

      <n-form-item label="Intro" path="intro">
        <n-input
          v-model:value="formValue.intro"
          type="textarea"
          placeholder="Intro.."
        />
      </n-form-item>

      <n-form-item label="Content" path="content">
        <n-input
          v-model:value="formValue.content"
          path="content"
          type="textarea"
          placeholder="Content.."
        />
      </n-form-item>

      <n-form-item label="imageUrl" path="imageUrl">
        <n-input v-model:value="formValue.imageUrl" placeholder="imageUrl" />
      </n-form-item>

      <n-form-item label="imageAlt" path="imageAlt">
        <n-input v-model:value="formValue.imageAlt" placeholder="imageAlt" />
      </n-form-item>

      <n-form-item label="linkUrl" path="linkUrl">
        <n-input v-model:value="formValue.linkUrl" placeholder="linkUrl" />
      </n-form-item>

      <n-form-item label="linkLabel" path="linkLabel">
        <n-input v-model:value="formValue.linkLabel" placeholder="linkLabel" />
      </n-form-item>

      <n-button @click="handleSaveClick">
        Save
      </n-button>
      <n-button v-if="!isNew" @click="handleDeleteClick">
        Delete
      </n-button>
    </n-form>
  </loading-error>
</template>
