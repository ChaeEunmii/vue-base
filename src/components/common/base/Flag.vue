<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: [Object, Array, String, Number],
    required: true
  },
  size: {
    type: String,
    default: 'medium'
  },
  radius: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'block'
  }
});

const flags = computed(() => (Array.isArray(props.data) ? props.data : [props.data]));

// 클래스 객체 생성 로직 유지 (clsx 대신 배열 반환)
const rootClasses = computed(() => [
  'flag-root',
  props.size,
  props.radius ? `radius-${props.radius}` : '',
  props.type !== 'block' ? props.type : '',
  props.className
]);

const getItemData = (item) => {
  const isObject = typeof item === 'object' && item !== null && 'label' in item;
  return {
    label: isObject ? item.label : item,
    color: isObject ? (item.color ?? props.color) : props.color,
    className: isObject ? item.className : ''
  };
};
</script>

<template>
  <div :class="rootClasses">
    <span
      v-for="(item, index) in flags"
      :key="index"
      class="flag-item"
      :class="[getItemData(item).color, getItemData(item).className]"
    >
      {{ getItemData(item).label }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.flag-root {
  display: flex;
  gap: 4px;
  
  &.inline {
    display: inline-flex;
  }

  // 사이즈 정의
  &.small { font-size: 12px; }
  &.medium { font-size: 14px; }
  &.large { font-size: 16px; }

  // 라운드 정의
  &.radius-all { border-radius: 4px; }
  &.radius-tl { border-top-left-radius: 4px; }

  .flag-item {
    padding: 2px 8px;
    
    // 컬러 정의
    &.dark2 { color: #ffffff; background-color: #222222; }
    &.red2 { color: #f12e2d; background-color: #ffeeee; }
    &.green3 { color: #ffffff; background-color: #05b15b; }
    &.green4 { 
      color: #05b15b; 
      background-color: #ffffff; 
      border: 1px solid #05b15b; 
    }
    &.gray3 { color: #222222; background-color: #f2f2f2; }
  }
}
</style>
