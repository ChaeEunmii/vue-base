<script setup>
import { inject, useId, ref, onMounted, watch, nextTick } from 'vue'

defineOptions({
  name: 'CustomTextarea',
  inheritAttrs: false
});

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  id: { type: String, default: undefined },
  name: { type: String, default: undefined },
  /** 고정 높이 (예: '200px') */
  height: { type: String, default: undefined },
  /** 자동 높이 조절 여부 */
  resize: Boolean,
  maxLength: { type: [Number, String], default: undefined },
  placeholder: { type: String, default: '' },
  disabled: Boolean,
  readonly: Boolean,
  error: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const textareaRef = ref(null)
const injectedId = inject('form-group-id', null)
const inputId = props.id || injectedId || useId()

/** [핵심] 높이 자동 조절 함수 */
const adjustHeight = () => {
  if (!props.resize || !textareaRef.value) return
  
  const el = textareaRef.value
  el.style.height = 'auto' // 높이 초기화
  el.style.height = `${el.scrollHeight}px` // 내용물 높이만큼 설정
}

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
  if (props.resize) adjustHeight()
}

// 초기값 대응 및 외부에서 modelValue 변경 시 대응
watch(() => props.modelValue, () => {
  nextTick(adjustHeight)
})

onMounted(() => {
  if (props.resize) adjustHeight()
})
</script>

<template>
  <div 
    class="textarea-root"
    :class="{ 'is-disabled': disabled, 'is-readonly': readonly, 'is-error': error }"
    :style="{ height: props.height }"
  >
    <textarea
      ref="textareaRef"
      class="textarea-inner"
      :id="inputId"
      :name="name"
      :value="modelValue"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="error"
      v-bind="$attrs"
      @input="onInput"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
.textarea-root {
  position: relative;
  width: 100%;
  min-height: rem(100px);
  padding: var(--spacing-x8) var(--spacing-x12);
  border: var(--border-width-base) solid var(--color-gray-150);
  border-radius: var(--border-radius-base);
  background-color: var(--color-background);
  transition: border-color 0.2s;
  overflow: hidden; // 자동 높이 시 스크롤바 깜빡임 방지

  &:focus-within {
    border-color: var(--color-primary);
  }

  .textarea-inner {
    width: 100%;
    height: 100%;
    border: none;
    outline: 0;
    padding: 0;
    background: transparent;
    font-family: inherit;
    font-size: var(--font-size-14);
    line-height: 1.6;
    color: var(--color-text-main);
    resize: none; // 직접 드래그 리사이즈는 막음 (자동 조절과 충돌 방지)

    &::placeholder {
      color: var(--color-gray-350);
    }
  }

  &.is-disabled {
    background-color: var(--color-gray-50);
    cursor: not-allowed;
    .textarea-inner { cursor: not-allowed; }
  }

  &.is-error {
    border-color: var(--color-error);
  }
}
</style>
