<script setup>
import { ref, computed, useId, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Object, null], default: '' },
  options: {
    type: Array,
    default: () => [],
    // 구조: [{ label: '제주', value: 'jeju', disabled: true }, ...]
  },
  label: String,
  placeholder: { type: String, default: '선택해주세요' },
  disabled: Boolean,
  error: Boolean,
  name: { type: String, default: () => `select-${useId()}` },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const selectRef = ref(null)
// 키보드로 탐색 중인 인덱스
const activeIndex = ref(-1)

const selectedLabel = computed(() => {
  const option = props.options.find((opt) => opt.value === props.modelValue)
  return option ? option.label : props.placeholder
})

const handleSelect = (option) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

/** 키보드 핸들링 추가 */
const onKeyDown = (e) => {
  if (props.disabled) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) isOpen.value = true
      activeIndex.value = Math.min(activeIndex.value + 1, props.options.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = Math.max(activeIndex.value - 1, 0)
      break
    case 'Enter':
      e.preventDefault()
      if (isOpen.value && activeIndex.value !== -1) {
        handleSelect(props.options[activeIndex.value])
      } else {
        isOpen.value = !isOpen.value
      }
      break
    case 'Escape':
      isOpen.value = false
      break
    case 'Tab':
      isOpen.value = false
      break
  }
}

// 드롭다운이 닫힐 때 activeIndex를 -1로 초기화
watch(isOpen, (newVal) => {
  if (!newVal) {
    activeIndex.value = -1
  }
})

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const rootClasses = computed(() => [
  'select-root',
  { 'is-open': isOpen.value, 'is-disabled': props.disabled, 'has-error': props.error },
])
</script>

<template>
  <div ref="selectRef" :class="rootClasses" @keydown="onKeyDown">
    <button
      type="button"
      class="select-trigger"
      :disabled="disabled"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-labelledby="label ? `${name}-label` : undefined"
      @click="isOpen = !isOpen"
    >
      <span :class="['selected-text', { 'is-placeholder': !modelValue }]">
        {{ selectedLabel }}
      </span>
      <span class="select-arrow" aria-hidden="true">▼</span>
    </button>

    <Transition name="fade">
      <ul v-if="isOpen" class="select-options" role="listbox" tabindex="-1">
        <li
          v-for="(option, index) in options"
          :key="option.value"
          role="option"
          :aria-selected="option.value === modelValue"
          :class="[
            'select-option',
            {
              'is-selected': option.value === modelValue,
              'is-disabled': option.disabled,
              'is-active': activeIndex === index, // 키보드 포커스 시각화
            },
          ]"
          @click="handleSelect(option)"
          @mouseenter="activeIndex = index"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
/* 기존 스타일 유지하면서 'is-active' (키보드 포커스) 스타일만 추가 */
.select-root {
  position: relative;
  width: 100%;

  .select-trigger {
    width: 100%;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
    border-radius: 4px;

    &:focus {
      outline: 2px solid #1890ff;
      outline-offset: -1px;
    }

    &:disabled {
      cursor: not-allowed;
      background: #f5f5f5;
    }
    .selected-text.is-placeholder {
      color: #999;
    }
  }

  .select-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 4px;
    padding: 0;
    list-style: none;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
  }

  .select-option {
    padding: 10px 14px;
    cursor: pointer;

    // 마우스 호버와 키보드 탐색(is-active) 모두 대응
    &:hover:not(.is-disabled),
    &.is-active:not(.is-disabled) {
      background: #f0f0f0;
    }

    &.is-selected {
      background: #e6f7ff;
      color: #1890ff;
      font-weight: bold;
    }
    &.is-disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
