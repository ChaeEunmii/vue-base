<script setup>
import { computed, useId } from 'vue'

/** [V-Model] 그룹 내 선택된 값 */
const model = defineModel({
  type: [String, Number, Boolean, null],
  default: '',
})

const props = defineProps({
  /** 스타일 변형 (default, filter 등) */
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'boxed', 'filter', 'title'].includes(v),
  },
  /** 라디오 크기 */
  size: {
    type: String,
    default: 'medium',
  },
  /** 라벨 내용 */
  label: { type: String, default: '' },
  /** 선택 시의 값 */
  value: { type: [String, Number, Boolean], required: true },
  id: { type: String, default: undefined },
  name: { type: String, default: undefined },
  /** 에러 상태 */
  error: Boolean,
  disabled: Boolean,
  hideLabel: Boolean,
})

const emit = defineEmits(['change'])

/** ID 관리 */
const radioId = props.id || useId()
// 이렇게 하면 부모(FormGroup)가 주는 ID는 무시하고,
// 내가 직접 넣거나 아니면 자동으로 고유 ID를 만듭니다.

/** [가이드 적용] rootClasses */
const rootClasses = computed(() => [
  'radio-root', // 전달주신 스타일의 .root 역할
  props.variant !== 'default' && props.variant, // .filter 등
  props.size !== 'medium' && props.size,
  {
    'is-error': props.error,
  },
])
</script>

<template>
  <span :class="rootClasses">
    <input
      v-model="model"
      type="radio"
      class="radio-input"
      :id="radioId"
      :name="name"
      :value="value"
      :disabled="disabled"
      :aria-invalid="error"
      @change="emit('change', $event)"
    />

    <label v-if="label" :for="radioId" class="radio-label">
      <span class="radio-icon"></span>
      <span :class="{ 'ut-blind': hideLabel }">
        {{ label }}
      </span>
    </label>
  </span>
</template>

<style lang="scss" scoped>
.radio-root {
  /* 전달주신 변수 및 스타일 설정 */
  --radio-width: #{rem(20px)};
  --radio-height: #{rem(20px)};
  --radio-label-font-size: var(--radio-font-size, var(--font-size-14));
  --radio-label-font-weight: var(--radio-font-weight, var(--font-weight-medium));
  --radio-label-line-height: 1.444;
  --radio-inset-top: calc(
    (var(--radio-label-font-size) * var(--radio-label-line-height) - var(--radio-height)) / 2
  );
  --radio-inset: var(--radio-inset-top) 0 0 0;
  --radio-label-gap: var(--spacing-x4);
  --radio-border-color: var(--color-gray-150);
  --radio-background-color: var(--color-background);

  position: relative;
  display: inline-flex;
  font-size: var(--radio-label-font-size);
  font-weight: var(--radio-label-font-weight);
  line-height: var(--radio-label-line-height);
  z-index: 0;

  .radio-label {
    display: var(--radio-label-display, inline-flex);
    align-items: inherit;
    gap: var(--radio-label-gap);
    width: 100%;
    word-break: break-all;
    color: var(--color-gray-700);
    cursor: pointer;

    .radio-icon {
      flex: 0 0 auto;
      @include flex(inline-flex, center, center);
      position: var(--radio-icon-position, relative);
      inset: var(--radio-inset);
      width: var(--radio-width);
      height: var(--radio-height);
      border: var(--border-width-base) solid var(--radio-border-color);
      box-shadow: inset 0 0 0 var(--radio-inset-width) var(--radio-inset-color);
      background-color: var(--radio-background-color);
      border-radius: var(--border-radius-max);
      z-index: var(--radio-icon-z-index, auto);
    }

    :where(p) {
      margin-top: 0;
      line-height: var(--radio-height);
    }
  }

  .radio-input {
    flex: 0 0 auto;
    position: relative;
    inset: var(--radio-inset);
    width: var(--radio-width);
    height: var(--radio-height);
    margin-right: calc(var(--radio-width) * -1);
    z-index: -1;
    opacity: 0; // 숨김 처리 추가

    &:checked + .radio-label {
      --radio-inset-width: #{rem(5px)};
      --radio-inset-color: currentColor;
      --radio-border-color: currentColor;
      --radio-background-color: #fff;
      color: var(--color-gray-900);
    }

    &:disabled + .radio-label {
      --radio-border-color: var(--color-gray-150);
      --radio-background-color: var(--color-gray-100);
      color: var(--color-gray-500);
      cursor: default;
    }

    &:checked:disabled + .radio-label {
      --radio-inset-color: var(--color-gray-100);
      --radio-background-color: currentColor;
    }
  }

  /* [추가] 에러 스타일 처리 */
  &.is-error {
    --radio-border-color: var(--color-accent-alert, #f56c6c);
    .radio-label {
      color: var(--color-accent-alert, #f56c6c);
    }
  }

  /* Variant: Filter */
  &.filter {
    --radio-label-font-size: var(--font-size-16);
    padding-inline: var(--spacing-indent);

    .radio-label {
      align-items: center;
      .radio-icon {
        margin-left: auto;
        order: 2;
      }
    }
    .radio-input:checked + .radio-label {
      font-weight: var(--font-weight-semibold);
    }
  }
}
</style>
