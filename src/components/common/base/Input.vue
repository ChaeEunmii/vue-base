<script setup>
import { inject, computed, useId } from 'vue'

/** [V-Model 최신 방식] */
const model = defineModel({
  type: [String, Number],
  default: '',
})

const props = defineProps({
  /** 외부 전달 ID */
  id: { type: String, default: undefined },
  /** 폼 식별자 */
  name: { type: String, default: undefined },
  /** 입력 타입 제한 */
  type: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'password', 'email', 'tel', 'url', 'search', 'number'].includes(v),
  },
  /** 필드 사이즈 */
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v),
  },
  /** [추가] 최대 입력 글자 수 */
  maxLength: {
    type: [Number, String],
    default: undefined,
  },
  placeholder: { type: String, default: '' },
  /** 지우기 버튼 표시 여부 */
  clearable: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  error: Boolean,
})

/** * [이벤트 추가]
 * 부모가 @click, @focus, @blur 등을 쓸 수 있게 선언합니다.
 */
const emit = defineEmits(['focus', 'blur', 'input', 'click'])

// 부모(FormGroup)가 보낸 ID가 있는지 확인합니다. (리액트 useContext 역할)
const injectedId = inject('form-group-id', null)
/**
 * 우선순위:
 * 1. 내가 직접 받은 props.id
 * 2. 부모(FormGroup)가 내려준 injectedId
 * 3. 둘 다 없으면 새로 생성(useId)
 */
const inputId = props.id || injectedId || useId()

/** 클래스 조립 */
const rootClasses = computed(() => [
  'input-root',
  `is-${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-readonly': props.readonly,
    'is-error': props.error,
  },
])

const onInput = (event) => {
  emit('input', event)
}

// 입력값 초기화 함수
const handleClear = () => {
  model.value = ''
  emit('input', { target: { value: '' } })
}
// 지우기 버튼 노출 조건
const showClearBtn = computed(() => {
  return props.clearable && model.value && !props.disabled && !props.readonly
})
</script>

<template>
  <div :class="[rootClasses, { 'has-clear': props.clearable }]">
    <input
      v-model="model"
      class="input-inner"
      :id="inputId"
      :name="name"
      :type="type"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="props.error"
      @click="emit('click', $event)"
      @input="onInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <button
      v-if="showClearBtn"
      type="button"
      class="btn-clear"
      aria-label="입력내용 지우기"
      @mousedown.prevent="handleClear"
    >
      <span class="icon-x">✕</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.input-root {
  position: relative;
  @include flex(flex, flex-start, center) {
    gap: var(--spacing-x6);
  }
  width: 100%;
  height: rem(44px);
  padding: 0 var(--spacing-x8);
  font-size: var(--font-size-13);
  line-height: var(--line-height-18);
  border: var(--border-width-base) solid var(--color-gray-150);
  border-radius: var(--border-radius-base);
  background-color: var(--color-background);
  cursor: text;
  .input-inner {
    flex: 1;
    width: 1%;
    height: 100%;
    outline: 0;
    font-weight: var(--font-weight-medium);
    &:focus {
      touch-action: pan-x;
    }
  }

  .clear {
    --icon-color: var(--color-gray-350);
  }
  .reveal {
    --icon-color: var(--color-gray-500);
  }

  &.is-small .input-inner {
    font-size: 12px;
    height: 28px;
  }
  &.is-medium .input-inner {
    font-size: 14px;
    height: 36px;
  }
  &.is-large .input-inner {
    font-size: 16px;
    height: 44px;
  }

  &.is-disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
  }
  &.is-error {
    border-color: #f56c6c;
  }
}
</style>
