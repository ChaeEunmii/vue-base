<template>
  <div class="title-area">
    <div class="breadcrumb-slot">
      <slot name="breadcrumb"></slot>
    </div>
    <div class="title-flex">
      <h2 class="page-title">
        <slot name="title">{{ title || $route.meta.title }}</slot>
      </h2>
      <div class="action-slot">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
})
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
.title-area {
  padding: 30px 0 20px;
}
.title-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #111;
}
</style>
