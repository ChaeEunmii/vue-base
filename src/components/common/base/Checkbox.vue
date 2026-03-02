<script setup>
import { computed, useId } from 'vue'

const model = defineModel({ type: [Boolean, Array], default: false })

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'boxed'].includes(v),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium'].includes(v),
  },
  label: { type: String, default: '' },
  id: { type: String, default: undefined },
  name: { type: String, default: undefined },
  value: { type: [String, Number, Boolean], default: undefined },
  disabled: Boolean,
  error: Boolean,
  hideLabel: Boolean,
})

const emit = defineEmits(['change'])

/** ID 관리 */
const checkboxId = props.id || useId()
// 이렇게 하면 부모(FormGroup)가 주는 ID는 무시하고,
// 내가 직접 넣거나 아니면 자동으로 고유 ID를 만듭니다.

const rootClasses = computed(() => [
  'checkbox-root',
  props.variant !== 'default' && `is-${props.variant}`,
  props.size !== 'medium' && `is-${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-error': props.error, // 클래스명도 에러로 통일
  },
])
</script>

<template>
  <span :class="rootClasses">
    <input
      v-model="model"
      type="checkbox"
      class="checkbox-input"
      :id="checkboxId"
      :name="name"
      :value="value"
      :disabled="disabled"
      :aria-invalid="error"
      @change="emit('change', $event)"
    />

    <label v-if="label" :for="checkboxId" class="checkbox-label">
      <span class="checkbox-icon"></span>
      <span :class="{ 'ut-blind': hideLabel }">
        {{ label }}
      </span>
    </label>
  </span>
</template>

<style lang="scss" scoped>
.checkbox-root {
  display: inline-flex;
  align-items: center;
  position: relative;

  .checkbox-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .checkbox-label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .checkbox-icon {
      // 체크박스 커스텀 아이콘 스타일
      transition: all 0.2s;
    }
  }

  // variants
  &.is-boxed {
    /* ... */
  }

  // sizes
  &.is-small {
    /* ... */
  }

  // states
  &.is-disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
