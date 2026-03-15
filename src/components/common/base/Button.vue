<script setup>
import { computed, useAttrs } from 'vue'
import { Icon } from '@/components/common'

/** attrs 사용 */
const attrs = useAttrs()

/**
 * inheritAttrs: false
 * 부모가 전달한 속성(id, title, class 등)이 컴포넌트의 루트 요소에 자동으로 붙는 것을 막습니다.
 * 대신 템플릿 안에서 v-bind="$attrs"를 통해 원하는 위치에 직접 꽂아줄 수 있습니다.
 */
defineOptions({
  inheritAttrs: false,
})

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
  /** 아이콘 이름(name)을 받는 props */
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
 * [가이드 적용] 버튼 사이즈별 아이콘 컴포넌트 전달용 사이즈 매핑
 * 버튼의 size prop(Key)에 따라 AppIcon의 size prop(Value)을 결정합니다.
 */
const ICON_SIZE_MAP = {
  xlarge: 'large', // 56px 버튼 -> 큰 아이콘
  large: 'medium', // 52px 버튼 -> 중간 아이콘
  medium: 'small', // 44px 버튼 -> 작은 아이콘
  small: 'xsmall', // 36px 버튼 -> 아주 작은 아이콘
  xsmall: 'xsmall', // 28px 버튼 -> 아주 작은 아이콘
}

const mappedIconSize = computed(() => {
  return ICON_SIZE_MAP[props.size] || 'small'
})

/** 버튼 type 처리 (submit override 가능) */
const buttonType = computed(() => attrs.type || 'button')

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
  <button
    v-bind="attrs"
    :type="buttonType"
    :class="rootClasses"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <template v-if="iconOnly">
      <Icon :name="iconOnly" :size="mappedIconSize" />
    </template>

    <template v-else>
      <Icon v-if="prefixIcon" :name="prefixIcon" :size="mappedIconSize" />

      <span v-if="$slots.default" class="btn-label">
        <slot></slot>
      </span>

      <Icon v-if="suffixIcon" :name="suffixIcon" :size="mappedIconSize" />
    </template>
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
