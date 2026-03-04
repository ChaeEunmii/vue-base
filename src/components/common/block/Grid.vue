<template>
  <component :is="tag" class="app-grid" :style="{ '--gap': gap }">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: { type: String, default: 'div' }, // section, article 등으로 변경 가능
  gap: { type: String, default: '1rem' }
});
</script>

<style scoped>
.app-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr)); /* 12컬럼 고정 */
  gap: var(--gap);
  width: 100%;
}
</style>
