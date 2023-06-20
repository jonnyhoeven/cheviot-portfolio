<script setup lang="ts">
const { $client } = useNuxtApp()

const { data: badges, pending, error } = $client.badge.useQuery({ limit: 19 })

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
// const  timer = ref(setInterval(()=>{  next();    }, 5000))
const icons = ref(badges)
const next = () => {
  shuffleArray(icons.value)
  // const tmp = icons.value.shift();
  // icons.value.push(tmp);
}

// onMounted(() => timer.value();
// onUnmounted(() => timer.reset());
</script>

<template>
  <h1
    class="font-title text-left font-black"
  >
    jCodes.nl
  </h1>
</template>
