<script setup lang="ts">
import { h } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Post } from '@prisma/client'
definePageMeta({ middleware: 'auth' })
const { $client } = useNuxtApp()
const message = useMessage()
const router = useRouter()
const { data, pending, error } = await $client.admin.allPosts.useQuery({ limit: 30 })

const createColumns = ({
  deletePost, editPost
}: {
  deletePost: (rowData: Post) => void
  editPost: (rowData: Post) => void
}): DataTableColumns<Post> => {
  return [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Title',
      key: 'title',
      ellipsis: true
    },
    {
      title: 'Subtitle',
      key: 'subtitle',
      ellipsis: true
    },
    {
      title: 'Content',
      key: 'content',
      ellipsis: true
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return [h(
          NButton,
          {
            size: 'small',
            onClick: () => deletePost(row)
          },
          { default: () => 'Delete' }
        ), h(
          NButton,
          {
            size: 'small',
            onClick: () => editPost(row)
          },
          { default: () => 'Edit' }
        )]
      }
    }
  ]
}

const columns = createColumns({
  deletePost: (rowData) => {
    const { error } = $client.admin.deletePost.useQuery({
      id: rowData.id
    })
    if (error.value) {
      message.error(`Error ${error.value}`)
    } else {
      message.success('Record deleted')
      // @ts-expect-error
      data.value.splice(data.value.indexOf(rowData), 1)
    }
  },
  editPost: (rowData) => {
    router.push(`/admin/post/${rowData.id}`)
  }
})

</script>
<template>
  <div>
    <nuxt-link to="/admin/post/new">
      New Post
    </nuxt-link>

    <loading-error :error="error" :pending="pending">
      <n-data-table
        :bordered="true"
        :single-line="true"
        :columns="columns"
        :data="data"
        :pagination="{ pageSize: 10 }"
      />
    </loading-error>
  </div>
</template>
