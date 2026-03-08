<script setup>
import { computed, useId } from 'vue'
import { Checkbox } from '@/components/common'

/** [V-Model 최신 방식] */
const model = defineModel({
  type: Array,
  default: () => [],
})

const props = defineProps({
  /** 선택된 값들의 배열 (v-model) */
  // modelValue: { type: Array, default: () => [] },
  /** 체크박스 그룹명 */
  name: { type: String, default: () => `checkbox-group-${useId()}` },
  /** 옵션 배열 */
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

// 값이 바뀔 때 부모에게 추가로 change 이벤트를 보내고 싶을 때 사용
const emit = defineEmits(['change'])

const handleChange = () => {
  emit('change', model.value)
}

/**
 * 부모의 배열을 그대로 가져와서 자식에게 던져줍니다.
 */
// const model = computed({
//   // 1. 부모의 값을 가져올 때 (get)
//   // "부모님, 지금 선택된 값이 뭐예요? 자식들한테 보여주게 알려주세요."
//   get: () => props.modelValue,

//   // 2. 자식이 값을 바꿀 때 (set)
//   // "자식이 다른 걸 클릭했네요! 부모님, 값을 이걸로 업데이트해주세요!"
//   set: (val) => {
//     emit('update:modelValue', val)
//     emit('change', val)
//   },
// })

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
      :value="option.value"
      :name="name"
      :label="option.label"
      :disabled="disabled || option.disabled"
      :error="error"
      @change="handleChange"
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
