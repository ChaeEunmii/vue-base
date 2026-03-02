import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 모든 컴포넌트에서 공통 변수·믹스인을 import 없이 즉시 사용 가능하도록 자동 주입
        additionalData: `@use '@/assets/styles/abstracts' as *;`,
      },
    },
  },
})
