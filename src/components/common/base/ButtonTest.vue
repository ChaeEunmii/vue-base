<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue' // 아이콘 컴포넌트 경로에 맞춰 확인해주세요.

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
  /** 아이콘 관련 props (기존 Icon 컴포넌트의 name으로 전달됨) */
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
 * 클래스 로직
 * 아이콘 전용 버튼일 경우 '.is-icon-only' 클래스를 추가하여 스타일을 제어합니다.
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
 * 버튼 크기에 따른 내부 아이콘 크기 결정
 * 버튼이 작을 때는 아이콘도 작게(xsmall/small) 설정합니다.
 */
const iconSize = computed(() => {
  if (['xsmall', 'small'].includes(props.size)) return 'xsmall'
  if (['xlarge', 'large'].includes(props.size)) return 'large'
  return 'small' // 기본 medium 버튼에는 small 아이콘이 시각적으로 안정적입니다.
})

/**
 * 버튼 클릭 핸들러
 */
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
      <AppIcon :name="iconOnly" :size="iconSize" :label="iconOnly" />
    </template>

    <template v-else>
      <AppIcon v-if="prefixIcon" :name="prefixIcon" :size="iconSize" />
      <span v-if="$slots.default" class="btn-label">
        <slot></slot>
      </span>
      <AppIcon v-if="suffixIcon" :name="suffixIcon" :size="iconSize" />
    </template>
  </button>
</template>

<style lang="scss" scoped>
.btn-root {
  position: relative;
  // 아이콘과 텍스트 정렬을 위해 flex 유지
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
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
    color: var(--color-white);
    border-color: var(--color-gray-450);
    background-color: var(--color-gray-450);
  }

  // 아이콘만 있는 버튼일 때의 처리
  &.is-icon-only {
    padding: 0;
    width: rem(44px); // 기본 높이와 동일하게 설정하여 정방형 유지
    aspect-ratio: 1;

    // 아이콘 버튼 내부에 특정 클래스가 있을 때의 기존 로직 유지
    &:has(> :global(.ncp-blind)) {
      width: auto;
      padding: 0;
      aspect-ratio: 1;
    }
  }

  &.btn-block {
    width: 100%;
  }
}

// 사이즈별 높이 및 아이콘 전용 너비 대응
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
  gap: var(--spacing-x2);
  height: rem(36px);
  font-size: var(--font-size-13);
  font-weight: var(--font-weight-regular);
  &.is-icon-only { width: rem(36px); }
}
.btn-size-xsmall {
  gap: var(--spacing-x1);
  width: auto;
  height: rem(28px);
  padding-inline: var(--spacing-x6);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-regular);
  border-radius: var(--border-radius-s);
  &.is-icon-only { 
    width: rem(28px); 
    padding-inline: 0;
  }
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

// variant (기존 유지)
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
