<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: [String, Array], // v-model 연결
  data: { type: Array, default: () => [] }, // 칩 데이터 리스트
  name: { type: String, required: true }, // input name
  label: [String, Object],
  ariaLabel: String,
  variant: String, // 'outlined', 'filter' 등
  type: { type: String, default: 'grid' }, // 'grid' | 'swiper' (가로 스크롤) 대응
  multiple: Boolean,
  size: String,
  round: Boolean,
  columns: [Number, String],
  firstInputId: String,
})

const emit = defineEmits(['update:modelValue', 'change'])

// Vue 3.5+ 내장 ID 생성
const baseId = useId()

// 선택된 값들을 배열로
const selectedList = computed(() => {
  if (props.modelValue === undefined) return []
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

// 체크박스/라디오 타입 결정
const inputType = computed(() => (props.multiple ? 'checkbox' : 'radio'))

// 클릭 이벤트 핸들러
const handleChange = (value) => {
  let newValue

  if (props.multiple) {
    const current = [...selectedList.value]
    if (value === 'all') {
      newValue = ['all']
    } else {
      const filtered = current.filter((v) => v !== 'all')
      newValue = current.includes(value)
        ? filtered.filter((v) => v !== value)
        : [...filtered, value]
    }
  } else {
    newValue = [value]
  }

  const emitVal = props.multiple ? newValue : newValue[0]
  emit('update:modelValue', emitVal)
  emit('change', emitVal)
}

// 그리드 컬럼 스타일
const containerStyle = computed(() => {
  if (typeof props.columns === 'number') {
    return { '--chip-grid-columns': props.columns }
  }
  return {}
})
</script>

<template>
  <div
    role="group"
    :aria-label="typeof label === 'string' ? label : ariaLabel"
    :class="['root', variant, size, { round }, $attrs.class]"
  >
    <div
      :class="[
        type === 'swiper' ? 'scroll-container' : 'container',
        { gridColumns: columns !== 'auto' },
      ]"
      :style="containerStyle"
    >
      <div v-for="(item, i) in data" :key="item.value" class="chip-item">
        <div :class="['chip', item.className]">
          <input
            :type="inputType"
            :id="i === 0 && firstInputId ? firstInputId : `${name}-${baseId}-${i}`"
            :name="name"
            :value="item.value"
            :checked="selectedList.includes(item.value)"
            :disabled="item.disabled"
            class="input"
            @change="handleChange(item.value)"
          />
          <label
            :for="i === 0 && firstInputId ? firstInputId : `${name}-${baseId}-${i}`"
            :class="['label', { disabled: item.disabled }]"
          >
            <slot name="prefix" :item="item" :checked="selectedList.includes(item.value)"></slot>

            <span class="text">{{ item.label }}</span>

            <slot name="suffix" :item="item" :index="i"></slot>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  --chip-gap: var(--spacing-x2);
  --chip-min-width: 2rem;
  --chip-min-height: #{rem(44px)};
  --chip-border-color: var(--color-gray-150);
  --chip-text-color: var(--color-gray-700);
  --chip-text-align: center;
  --chip-label-font-size: var(--font-size-14);
  --chip-label-line-height: var(--line-height-fit);
  --chip-label-justify-contents: center;

  .container {
    @include flex($display: inline-flex, $w: wrap);
    gap: var(--spacing-x4);
    // columns 'auto'가 아닌 경우 스타일
    &.gridColumns {
      @include grid($gap: var(--chip-gap)) {
        grid-template-columns: repeat(
          var(--chip-grid-columns, auto-fill),
          minmax(var(--chip-min-width), 1fr)
        );
      }
    }
  }
  .chip {
    position: relative;
    display: inline-block;
    &[aria-hidden='true'] {
      display: none !important;
    }
  }
  .input {
    @include blind;
    &:checked + .label {
      --chip-border-color: var(--color-foreground);
      --chip-text-color: var(--color-foreground);
      font-weight: var(--font-weight-semibold);
    }
  }
  .label {
    min-height: var(--chip-min-height);
    position: relative;
    @include flex(flex, var(--chip-label-justify-contents), center);
    padding-inline: var(--spacing-x6);
    color: var(--chip-text-color);
    font-size: var(--chip-label-font-size);
    font-weight: var(--font-weight-medium);
    line-height: var(--chip-label-line-height);
    text-align: var(--chip-text-align);
    border: var(--border-width-base) solid var(--chip-border-color, transparent);
    border-radius: var(--border-radius-base);
    cursor: pointer;
    white-space: pre-line;
    transition:
      border-color var(--transition-fast),
      background-color var(--transition-fast);

    &.disabled {
      --chip-text-color: var(--color-gray-850);
      cursor: not-allowed;
    }
  }

  // type swiper
  .swiper {
    user-select: none;
    :global(.swiper-wrapper) {
      display: flex;
    }
  }
  .swiperColumns {
    position: relative;
    flex: 0 1 100%;
    min-width: 25%;
    padding-left: var(--spacing-x4);
    &:first-child {
      padding-left: 0;
    }
    .chip {
      width: 100%;
    }
  }

  // variant
  .outlined {
    --chip-min-width: #{rem(80px)};
    --chip-text-color: var(--color-gray-700);
    --chip-outlined-checked-text-color: inherit;
    --chip-outlined-checked-font-weight: var(--font-weight-semibold);
    // --chip-outlined-padding: var(--spacing-x6) var(--spacing-x4);
    --chip-outlined-padding: var(--spacing-x6) var(--spacing-x8);
    --chip-outlined-disabled-text-color: var(--color-gray-500);
    .label {
      padding: var(--chip-outlined-padding);
      min-width: var(--chip-min-width);
      &.disabled {
        --chip-text-color: var(--chip-outlined-disabled-text-color);
        background-color: var(--color-gray-100);
      }
      span {
        display: block;
        margin-top: var(--spacing-x1);
      }
    }
    .input:checked + .label {
      color: var(--chip-outlined-checked-text-color);
      font-weight: var(--chip-outlined-checked-font-weight);
    }
  }

  .period {
    --chip-min-width: #{rem(80px)};
    .label {
      min-height: rem(40px);
      font-size: var(--font-size-14);
    }
  }

  .filled {
    --chip-min-height: #{rem(40px)};
    .label {
      --chip-text-color: var(--color-gray-500);
      --chip-border-color: var(--color-gray-150);
      background-color: var(--color-background);
      height: var(--chip-min-height);
    }
    .input:checked + .label {
      --chip-text-color: var(--color-background);
      --chip-border-color: var(--color-foreground);
      background-color: var(--color-foreground);
    }
  }

  .buttons {
    .container {
      gap: var(--spacing-x4);
    }
    .label {
      --chip-text-color: var(--color-gray-900);
      gap: var(--spacing-x2);
      height: var(--chip-min-height);
      font-weight: var(--font-weight-semibold);
    }
  }

  // size
  .small {
    .label {
      font-size: var(--font-size-13);
      line-height: var(--line-height-18);
      min-width: rem(36px);
      min-height: rem(34px);
      height: rem(34px);
      border-radius: var(--border-radius-s);
    }
  }
  .medium {
    .label {
      font-size: var(--font-size-14);
      line-height: var(--line-height-20);
      min-height: rem(44px);
      height: rem(44px);
      border-radius: var(--border-radius-base);
    }
  }
  .large {
    .container {
      gap: var(--spacing-x4);
    }
    .label {
      font-size: var(--font-size-14);
      line-height: var(--line-height-20);
      min-height: rem(60px);
      height: rem(60px);
      border-radius: var(--border-radius-base);
    }
  }

  //round
  .round {
    .label {
      border-radius: var(--border-radius-max);
      padding-inline: var(--spacing-x6);
    }
  }
}
</style>
