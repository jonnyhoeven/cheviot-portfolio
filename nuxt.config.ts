import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  telemetry: false,
  devtools: {
    enabled: false
  },
  runtimeConfig: {
    version: '0.0.1',
    // The private keys which are only available server-side
    databaseUrl: process.env.DATABASE_URL,
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', '@huntersofbook/naive-ui-nuxt'],
  build: {
    transpile: ['trpc-nuxt']
  },
  extends: ['@sidebase/core'],
  typescript: {
    shim: false,
    typeCheck: true
  }
})
