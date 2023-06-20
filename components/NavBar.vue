<script setup lang="ts">
import { MenuItem } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  strings: { [key: string]: string };
  menuItems: MenuItem[];
}>()
</script>

<template>
  <div class="bg-base-900 navbar">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn-ghost btn lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <!-- sidebar menu -->
          <li
            v-for="menuItem in menuItems"
            :key="`navbar-${menuItem.id}`"
            :menu-item="menuItem"
          >
            <nuxtLink :to="menuItem.link" class="px-1">
              {{
                menuItem.title
              }}
            </nuxtLink>
          </li>
        </ul>
      </div>
      <nuxt-link
        v-if="strings.title"
        :to="strings.base_url"
        class="btn-ghost btn text-xl normal-case"
      >
        {{ strings.title }}
      </nuxt-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <!-- top menu -->
        <li
          v-for="menuItem in menuItems"
          :key="`navbar-${menuItem.id}`"
          :menu-item="menuItem"
        >
          <nuxtLink :to="menuItem.link" class="px-1">
            {{
              menuItem.title
            }}
          </nuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn">Contact me</a>
    </div>
  </div>
</template>
