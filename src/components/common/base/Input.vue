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
</script>

<template>
  <div :class="rootClasses">
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
  </div>
</template>

<style lang="scss" scoped>
/* 이전과 스타일 동일 */
.input-root {
  display: flex;
  position: relative;
  width: 100%;
  .input-inner {
    width: 100%;
    color: #333;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    &:focus {
      border-color: #409eff;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
    }
  }

  &.is-small .input-inner {
    padding: 4px 8px;
    font-size: 12px;
    height: 28px;
  }
  &.is-medium .input-inner {
    padding: 8px 12px;
    font-size: 14px;
    height: 36px;
  }
  &.is-large .input-inner {
    padding: 10px 16px;
    font-size: 16px;
    height: 44px;
  }

  &.is-disabled .input-inner {
    background-color: #f5f7fa;
    cursor: not-allowed;
  }
  &.is-error .input-inner {
    border-color: #f56c6c;
  }
}
</style>
