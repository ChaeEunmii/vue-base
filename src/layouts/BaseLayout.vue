<script setup>
// import { RouterView } from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue'
import { SideNav } from '@/components/common'
</script>

<template>
  <div class="base-layout">
    <header class="main-header">
      <div class="logo">LOGO</div>
    </header>
    <div class="body-wrapper">
      <aside class="side-nav">
        <SideNav />
      </aside>
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;
}
.body-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden; /* 전체 스크롤 방지 */
}
.side-nav {
  width: 200px;
  background: #fff;
  color: #fff;
  flex-shrink: 0;
}
.main-content {
  flex: 1;
  background: #f5f5f5;
  overflow-y: auto; /* 컨텐츠 영역만 스크롤 */
}
.page-body {
  padding-bottom: 50px;
}
</style>
