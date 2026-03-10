<template>
  <nav class="breadcrumbs">
    <ol>
      <li class="home">
        <router-link to="/">홈</router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <span class="divider">></span>
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

const route = useRoute()
const breadcrumbs = computed(() => {
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  return matched.map((item, index) => ({
    label: item.meta.title,
    path: item.path,
    active: index === matched.length - 1,
  }))
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
