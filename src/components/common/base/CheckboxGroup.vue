<script setup>
import { computed, useId } from 'vue'
import { Checkbox } from '@/components/common'

const props = defineProps({
  /** 선택된 값들의 배열 (v-model) */
  modelValue: { type: Array, default: () => [] },
  /** 체크박스 그룹명 */
  name: { type: String, default: () => `checkbox-group-${useId()}` },
  /**  옵션 배열 */
  options: {
    type: Array,
    default: () => [],
    // 구조: [{ value: 'opt1', label: '옵션 1', disabled: false }, ...]
  },
  /** 세로 정렬 여부 */
  vertical: Boolean,
  /** 에러 상태 */
  error: Boolean,
  /** 그룹 전체 비활성화 */
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'change'])

/** 특정 옵션이 체크되었는지 확인하는 함수 (리액트의 isSelected 역할)*/
const isChecked = (optionValue) => {
  return props.modelValue.includes(optionValue)
}

/** 체크 상태가 바뀔 때 실행되는 함수
 * @param {any} optionValue - 선택된 항목의 값
 * @param {boolean} checked - 체크 여부
 */
const handleToggle = (optionValue, checked) => {
  // 1. 현재 배열 복사 (불변성 유지)
  const currentValues = [...props.modelValue]
  if (checked) {
    // 2. 체크되면 배열에 추가 (중복 방지)
    if (!currentValues.includes(optionValue)) {
      currentValues.push(optionValue)
    }
  } else {
    // 3. 체크 해제되면 배열에서 제거
    const index = currentValues.indexOf(optionValue)
    if (index > -1) {
      currentValues.splice(index, 1)
    }
  }

  // 4. 부모에게 최종 업데이트된 배열 전달
  emit('update:modelValue', currentValues)
  emit('change', currentValues)
}

const rootClasses = computed(() => [
  'checkbox-group-root',
  {
    'is-vertical': props.vertical,
    'is-error': props.error,
  },
])
</script>

<template>
  <div :class="rootClasses" role="group">
    <Checkbox
      v-for="option in options"
      :key="option.value"
      v-model="model"
      :name="name"
      :value="option.value"
      :label="option.label"
      :disabled="disabled || option.disabled"
      :error="error"
      :model-value="isChecked(option.value)"
      @update:model-value="(checked) => handleToggle(option.value, checked)"
    />
  </div>
</template>

<style lang="scss" scoped>
.checkbox-group-root {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  &.is-vertical {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
