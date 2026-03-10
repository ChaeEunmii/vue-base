<template>
  <aside class="lnb-container">
    <ul class="lnb-list">
      <SideNavItem v-for="menu in menuData" :key="menu.label" :item="menu" />
    </ul>
  </aside>
</template>

<script setup>
import SideNavItem from './SideNavItem.vue'
import { menuData } from './menu'
</script>

<style scoped>
.lnb-container {
  width: 200px;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
}
.lnb-list {
  margin: 0;
  padding: 0;
}
</style>
