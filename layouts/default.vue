<template>
  <div class="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 p-0 m-0 transition-colors ease-in-out duration-500">
    <nav-bar-header class="h-12" />
    <NConfigProvider>
      <NGlobalStyle />
      <slot />
    </NConfigProvider>
  </div>
</template>
