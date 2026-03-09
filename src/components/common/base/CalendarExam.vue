<script setup>
import { onUnmounted } from 'vue'

const onOpen = () => {
  document.body.classList.add('datepicker-open')
}

const onClose = () => {
  document.body.classList.remove('datepicker-open')
}
// 페이지 이동 시 클래스가 남지 않도록 정리
onUnmounted(() => {
  document.body.classList.remove('datepicker-open')
})
</script>

<template>
  <VueDatePicker teleport="body" @open="onOpen" @closed="onClose" />
</template>

<style>
/* body에 클래스가 붙었을 때의 스타일 */
body.datepicker-open {
  overflow: hidden; /* 예: 데이트피커가 열렸을 때 스크롤 방지 */
}

/* 전역 스타일 시트나 App.vue의 scoped가 아닌 스타일 섹션 */
body.datepicker-open::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 딤 처리 농도 */
  z-index: 999; /* 데이트피커 메뉴보다는 낮아야 함 */
  transition: opacity 0.3s ease;
}

/* vue3-datepicker의 기본 z-index는 보통 9999이므로 
   딤(999)보다 높게 설정되어 있어 별도 수정 없이도 위로 뜰 겁니다. 
   만약 안 뜬다면 아래 클래스를 조정하세요. */
.dp__menu {
  z-index: 9999 !important;
}

/* 선택사항: 딤 처리 시 본문 스크롤 방지 */
body.datepicker-open {
  overflow: hidden;
}
</style>
