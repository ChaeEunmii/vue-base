<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

/**
 * [가이드 적용] 버튼 사이즈별 아이콘 컴포넌트 전달용 사이즈 매핑
 * 버튼의 size prop(Key)에 따라 AppIcon의 size prop(Value)을 결정합니다.
 */
const ICON_SIZE_MAP = {
  xlarge: 'large',   // 56px 버튼 -> 큰 아이콘
  large: 'medium',   // 52px 버튼 -> 중간 아이콘
  medium: 'small',   // 44px 버튼 -> 작은 아이콘
  small: 'xsmall',   // 36px 버튼 -> 아주 작은 아이콘
  xsmall: 'xsmall',  // 28px 버튼 -> 아주 작은 아이콘
}

const props = defineProps({
  variant: {
    type: String,
    default: 'secondary',
    validator: (v) => ['primary', 'secondary', 'tertiary', 'neutral', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['xlarge', 'large', 'medium', 'small', 'xsmall'].includes(v),
  },
  /** 아이콘 이름(name)을 받는 props */
  prefixIcon: String,
  suffixIcon: String,
  iconOnly: String,
  /** 스타일 옵션 */
  rounded: Boolean,
  block: Boolean,
  isDisabled: Boolean,
})

const emit = defineEmits(['click'])

/**
 * 버튼 루트 클래스 계산
 */
const rootClasses = computed(() => [
  'btn-root',
  `btn-${props.variant}`,
  `btn-size-${props.size}`,
  {
    'btn-rounded': props.rounded,
    'btn-block': props.block,
    'btn-disabled': props.isDisabled,
    'is-icon-only': !!props.iconOnly,
  },
])

/**
 * [핵심 로직] AppIcon에 전달할 size 속성값 계산
 */
const mappedIconSize = computed(() => {
  return ICON_SIZE_MAP[props.size] || 'small'
})

const handleClick = (event) => {
  if (props.isDisabled) return
  emit('click', event)
}
</script>

<template>
  <button 
    type="button" 
    :class="rootClasses" 
    :disabled="isDisabled" 
    @click="handleClick"
  >
    <template v-if="iconOnly">
      <AppIcon :name="iconOnly" :size="mappedIconSize" />
    </template>

    <template v-else>
      <AppIcon v-if="prefixIcon" :name="prefixIcon" :size="mappedIconSize" />
      
      <span v-if="$slots.default" class="btn-label">
        <slot></slot>
      </span>
      
      <AppIcon v-if="suffixIcon" :name="suffixIcon" :size="mappedIconSize" />
    </template>
  </button>
</template>

<style lang="scss" scoped>
.btn-root {
  position: relative;
  box-sizing: border-box;
  @include flex(inline-flex, center, center) {
    gap: var(--spacing-x2);
  }
  
  height: rem(44px);
  padding-inline: var(--spacing-x8);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius-base);
  border: var(--border-width-base) solid transparent;
  cursor: pointer;

  // 아이콘 전용 스타일
  &.is-icon-only {
    padding: 0;
    aspect-ratio: 1 / 1;
  }

  &.btn-disabled {
    cursor: not-allowed;
    background-color: var(--color-gray-450);
    color: var(--color-white);
  }
}

// 사이즈별 높이 및 아이콘 전용 너비 정밀 제어
.btn-size-xlarge {
  height: rem(56px);
  font-size: var(--font-size-16);
  &.is-icon-only { width: rem(56px); }
}
.btn-size-large {
  height: rem(52px);
  font-size: var(--font-size-16);
  &.is-icon-only { width: rem(52px); }
}
.btn-size-medium {
  height: rem(44px);
  &.is-icon-only { width: rem(44px); }
}
.btn-size-small {
  height: rem(36px);
  font-size: var(--font-size-13);
  &.is-icon-only { width: rem(36px); }
}
.btn-size-xsmall {
  height: rem(28px);
  font-size: var(--font-size-12);
  padding-inline: var(--spacing-x6);
  &.is-icon-only { 
    width: rem(28px); 
    padding-inline: 0;
  }
}

// Variants
.btn-primary {
  background-color: var(--color-foreground);
  color: var(--color-background);
}
.btn-secondary {
  background-color: var(--color-background);
  color: var(--color-foreground);
  border-color: var(--color-foreground);
}
// ... 나머지 variant 생략
</style>
