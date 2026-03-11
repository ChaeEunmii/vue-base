<template>
  <div class="search-box-wrapper">
    <div class="search-content">
      <slot></slot>
    </div>

    <div class="search-action">
      <button type="button" class="btn-search" @click="$emit('search')">검색</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['search'])
</script>

<style lang="scss" scoped>
.search-box-wrapper {
  display: flex;
  background-color: #f7f8fa; /* 스크린샷 같은 연한 배경색 */
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  gap: 30px; /* 필드 영역과 버튼 사이 간격 */
  align-items: flex-start; /* 버튼을 위쪽 정렬 (혹은 center) */
}
.search-content {
  flex: 1;
  display: grid;
  /* 12컬럼 그리드 설정 */
  grid-template-columns: repeat(12, 1fr);
  gap: 12px 24px;
}
/* 기본값: 전체(50%) 차지 */
.search-content :deep(> *) {
  grid-column: span 6;
}
/* ===== 개발자용 가이드 클래스 ===== */
/* 1개 배치 (100%) */
.search-content :deep(> .grid-1) {
  grid-column: span 12 !important;
}
/* 2개 배치 (50%) */
.search-content :deep(> .grid-2) {
  grid-column: span 6 !important;
}
/* 3개 배치 (33.3%) */
.search-content :deep(> .grid-3) {
  grid-column: span 4 !important;
}
/* 4개 배치 (25%) */
.search-content :deep(> .grid-4) {
  grid-column: span 3 !important;
}

.search-action {
  flex-shrink: 0; /* 버튼 영역 크기 유지 */
}

.btn-search {
  background-color: #1a1a1a;
  color: #fff;
  width: 90px;
  height: 44px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}
</style>
