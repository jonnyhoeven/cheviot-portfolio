import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const { $client } = useNuxtApp()

  const user = ref({
    id: 0,
    email: '',
    name: null,
    image: null,
    role: 'USER',
    active: false
  })

  const { data: session } = useSession()

  function getUser () {
    const { data } = $client.protected.user.useQuery()
    // @ts-expect-error
    user.value = data
  }

  if (!user.value.active && session?.value?.user) {
    getUser()
  }

  return { user }
})
