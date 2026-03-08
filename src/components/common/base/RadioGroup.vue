<script setup>
import { computed, useId } from 'vue'
import { Radio } from '@/components/common'

/** [V-Model 최신 방식] */
const model = defineModel({
  type: [String, Number, Boolean, null],
  default: '',
})

const props = defineProps({
  /** 현재 선택된 값 (v-model) */
  modelValue: { type: [String, Number, Boolean, null], default: '' },
  /** 라디오 그룹명 (생략 시 자동 생성) */
  name: { type: String, default: () => `radio-group-${useId()}` },
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

const emit = defineEmits(['change'])
/**
 * 값이 바뀔 때 부모에게 추가로 change 이벤트를 보냅니다.
 * v-model(model)이 이미 업데이트된 후 호출됩니다.
 */
const handleChange = (val) => {
  emit('change', val)
}

/** * 부모의 v-model과 연결되는 computed
 * 자식 Radio가 값을 바꾸면 부모에게 알립니다.
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
  'radio-group-root',
  {
    'is-vertical': props.vertical,
    'is-error': props.error,
  },
])
</script>

<template>
  <div :class="rootClasses" role="radiogroup">
    <Radio
      v-for="option in options"
      :key="option.value"
      v-model="model"
      :name="name"
      :value="option.value"
      :label="option.label"
      :disabled="disabled || option.disabled"
      :error="error"
      @change="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.radio-group-root {
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
