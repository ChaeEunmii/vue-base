<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 버튼 스타일 */
  variant: {
    type: String,
    default: 'secondary',
    validator: (v) => ['primary', 'secondary', 'tertiary', 'neutral', 'ghost'].includes(v),
  },
  /** 버튼 사이즈 */
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['xlarge', 'large', 'medium', 'small', 'xsmall'].includes(v),
  },
  /** 아이콘 관련 props */
  prefixIcon: String,
  suffixIcon: String,
  iconOnly: String,
  /** 스타일 옵션 */
  rounded: Boolean,
  block: Boolean,
  /** 비활성화 여부 */
  isDisabled: Boolean,
})

const emit = defineEmits(['click'])

/**
 * [가이드 적용] 클래스 로직을 computed로 분리
 * 디자인 시스템의 명명 규칙(BEM 등)을 깔끔하게 반영합니다.
 */
const rootClasses = computed(() => [
  'btn-root',
  `btn-${props.variant}`,
  `btn-size-${props.size}`,
  {
    'btn-rounded': props.rounded,
    'btn-block': props.block,
    'btn-disabled': props.isDisabled,
  },
])

/**
 * 버튼 클릭 핸들러
 * 표준 'click' 이벤트를 사용하여 리액트 유저에게도 익숙하게 만듭니다.
 */
const handleClick = (event) => {
  if (props.isDisabled) return
  emit('click', event)
}
</script>

<template>
  <button type="button" :class="rootClasses" :disabled="isDisabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<!-- 스타일 정의 -->
<style lang="scss" scoped>
.btn-root {
  position: relative;
  @include flex(inline-flex, center, center) {
    gap: var(--spacing-x2);
  }
  padding: var(--spacing-x2) var(--spacing-x8);
  height: rem(44px);
  font-size: var(--font-size-14);
  line-height: var(--line-height-fit);
  font-weight: var(--font-weight-bold);
  border: var(--border-width-base) solid transparent;
  border-radius: var(--border-radius-base);
  &:disabled {
    color: var(--color-white);
    border-color: var(--color-gray-450);
    background-color: var(--color-gray-450);
  }
  &:has(> :global(.ncp-blind)) {
    width: auto;
    padding: 0;
    aspect-ratio: 1;
  }
  &.btn-block {
    width: 100%;
  }
}

// size
.btn-size-xlarge {
  height: rem(56px);
  font-size: var(--font-size-16);
}
.btn-size-large {
  height: rem(52px);
  font-size: var(--font-size-16);
}
.btn-size-medium {
  height: rem(44px);
}
.btn-size-small {
  gap: var(--spacing-x2);
  height: rem(36px);
  font-size: var(--font-size-13);
  font-weight: var(--font-weight-regular);
}
.btn-size-xsmall {
  gap: var(--spacing-x1);
  width: auto;
  height: rem(28px);
  padding-inline: var(--spacing-x6);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-regular);
  border-radius: var(--border-radius-s);
}

// rounded
.btn-rounded {
  width: auto;
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius-max);
  &.btn-size-small {
    padding-inline: var(--spacing-x10);
    font-size: var(--font-size-12);
  }
}

// variant
.btn-primary {
  color: var(--color-background);
  border-color: var(--color-foreground);
  background-color: var(--color-foreground);
}
.btn-secondary {
  color: var(--color-foreground);
  border-color: var(--color-foreground);
  background-color: var(--color-background);
}
.btn-tertiary {
  border-color: var(--color-gray-150);
  background-color: var(--color-background);
  &:disabled {
    color: var(--color-gray-500);
    border-color: var(--color-gray-150);
    background-color: var(--color-bg-2);
  }
}
.btn-neutral {
  background: var(--color-bg-2);
}
</style>
