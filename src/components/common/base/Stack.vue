<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 방향: column(세로), row(가로) */
  direction: {
    type: String,
    default: 'row',
    validator: (v) => ['column', 'row'].includes(v),
  },
  /** 간격: 0, 1, 2, 3 */
  gap: {
    type: [String, Number],
    default: 0,
    validator: (v) => [0, 1, 2, 3, '0', '1', '2', '3'].includes(v),
  },
  /** 수직 정렬 */
  alignItems: {
    type: String,
    default: 'center',
    validator: (v) => ['start', 'center', 'end', 'stretch'].includes(v),
  },
  /** 수평 정렬  */
  justifyContent: {
    type: String,
    default: 'start',
    validator: (v) => ['start', 'center', 'end', 'between'].includes(v),
  },
  /** 전체 너비 여부 (기본은 inline-flex) */
  block: Boolean,
  /** 줄바꿈 여부 */
  wrap: Boolean,
})

const rootClasses = computed(() => [
  'stack-root',
  props.direction,
  `gap-${props.gap}`,
  `align-${props.alignItems}`,
  `justify-${props.justifyContent}`,
  {
    'is-block': props.block,
    'is-wrap': props.wrap,
  },
])
</script>

<template>
  <div :class="rootClasses">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.stack-root {
  display: inline-flex;
  box-sizing: border-box;

  // 상태 및 레이아웃 제어
  &.is-block {
    display: flex;
    width: 100%;
  }
  &.is-wrap {
    flex-wrap: wrap;
  }

  // 방향 제어
  &.column {
    flex-direction: column;
    width: 100%;
  }
  &.row {
    flex-direction: row;
  }

  // 간격(Gap) 제어
  &.gap-1 {
    gap: rem(4px);
  }
  &.gap-2 {
    gap: rem(8px);
  }
  &.gap-3 {
    gap: rem(12px);
  }

  // 수직 정렬 (align-items)
  &.align-start {
    align-items: flex-start;
  }
  &.align-center {
    align-items: center;
  }
  &.align-end {
    align-items: flex-end;
  }
  &.align-stretch {
    align-items: stretch;
  }

  // 수평 정렬 (justify-content)
  &.justify-start {
    justify-content: flex-start;
  }
  &.justify-center {
    justify-content: center;
  }
  &.justify-end {
    justify-content: flex-end;
  }
  &.justify-between {
    justify-content: space-between;
  }
}
</style>
