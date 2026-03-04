<script setup lang="ts">
import { computed } from 'vue'

// 타입을 외부에 내보내고 싶다면 export
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'ghost'
type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  prefixIcon?: string
  suffixIcon?: string
  iconOnly?: string
  rounded?: boolean
  block?: boolean
  isDisabled?: boolean
}

// 2. Generic defineProps: TS
const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'medium',
  rounded: false,
  block: false,
  isDisabled: false,
})

// 3. Emit 타입 정의
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

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

const handleClick = (event: MouseEvent) => {
  if (props.isDisabled) return
  emit('click', event)
}
</script>

<template>
  <button type="button" :class="rootClasses" :disabled="isDisabled" @click="handleClick">
    <slot />
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
