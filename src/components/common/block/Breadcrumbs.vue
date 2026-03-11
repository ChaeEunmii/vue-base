<template>
  <nav class="breadcrumbs">
    <ol>
      <li class="home">
        <router-link to="/">홈</router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <span v-if="index > 0" class="divider">></span>
        <router-link v-if="!crumb.active" :to="crumb.path">
          {{ crumb.label }}
        </router-link>
        <strong v-else>{{ crumb.label }}</strong>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { menuData } from '@/components/common/layouts/menu' // 메뉴샘플

const route = useRoute()

// 현재 경로에 맞는 메뉴 계층(부모->자식)을 menuData에서 찾아 배열로 반환
const breadcrumbs = computed(() => {
  const findPath = (nodes, path, acc = []) => {
    for (const node of nodes) {
      if (node.path === path) return [...acc, node]
      if (node.children) {
        const res = findPath(node.children, path, [...acc, node])
        if (res) return res
      }
    }
  }
  return findPath(menuData, route.path) || []
})
</script>

<style scoped>
.breadcrumbs ol {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  font-size: 14px;
  color: #666;
}
.breadcrumbs .divider {
  margin: 0 8px;
  color: #ccc;
}
.breadcrumbs a {
  text-decoration: none;
  color: inherit;
}
.breadcrumbs a:hover {
  text-decoration: underline;
}
.breadcrumbs strong {
  color: #333;
  font-weight: 700;
}
</style>
