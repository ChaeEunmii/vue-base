<script setup>
import { computed, useId } from 'vue'

const model = defineModel({ type: [String, Array], default: undefined })

const props = defineProps({
  /** 출력 방식 결정 */
  type: { type: String, default: 'grid' },
  /** 디자인 스타일 (예: 'outlined' - 테두리형, 'filled' - 배경색 채움형 등) */
  variant: String,
  /** 칩에 표시할 데이터 목록 (객체 배열 형태: { label, value, disabled 등 }) */
  data: { type: Array, default: () => [] },
  /** input 요소의 고유 name 속성 (라디오/체크박스 그룹화에 필수) */
  name: { type: String, required: true },
  /** 컴포넌트 전체를 설명하는 제목 (String 또는 이미지/아이콘 포함 Object) */
  label: [String, Object],
  /** 스크린 리더 등 웹 접근성을 위한 레이블 (label props가 없을 때 대체 사용) */
  ariaLabel: String,
  /** 다중 선택 여부 (true면 체크박스, false면 라디오 버튼으로 동작) */
  multiple: Boolean,
  /** 크기 옵션 (예: 'small', 'medium', 'large' 등 미리 정의된 CSS 클래스와 연결) */
  size: String,
  /** 둥근 버튼 형태 적용 여부 (true일 경우 완전 둥근 border-radius 적용) */
  round: Boolean,
  /** 그리드 레이아웃 시 보여줄 열(column)의 개수 또는 'auto' 설정 */
  columns: [Number, String],
  /** 외부에서 첫 번째 input에 포커스를 주거나 제어해야 할 때 사용하는 특정 ID */
  // firstInputId: String,
})

const emit = defineEmits(['change'])
// Vue 3.5+ 내장 ID 생성
const baseId = useId()

// 선택된 값들을 배열로 정규화
const selectedList = computed(() => {
  if (model.value === undefined) return []
  return Array.isArray(model.value) ? model.value : [model.value]
})

// 체크박스/라디오 타입 결정
const inputType = computed(() => (props.multiple ? 'checkbox' : 'radio'))

// 클릭 이벤트 핸들러
// const handleChange = (value) => {
//   let newValue

//   if (props.multiple) {
//     const current = [...selectedList.value]
//     if (value === 'all') {
//       newValue = ['all']
//     } else {
//       const filtered = current.filter((v) => v !== 'all')
//       newValue = current.includes(value)
//         ? filtered.filter((v) => v !== value)
//         : [...filtered, value]
//     }
//   } else {
//     newValue = [value] // 단일 선택 시 배열이 아닌 값 자체를 할당
//   }

//   const emitVal = props.multiple ? newValue : newValue[0]
//   emit('update:modelValue', emitVal)
//   emit('change', emitVal)
// }

/**
 * 칩 클릭 시 호출: model.value는 Vue가 이미 업데이트한 상태이므로
 * 부모에게 알림만 주면 끝납니다.
 */
// 클릭 이벤트 핸들러
const handleChange = (value) => {
  // 1. 다중 선택 모드일 때
  if (props.multiple) {
    if (value === 'all') {
      model.value = ['all'] // '전체'를 클릭하면 다른 모든 선택을 지우고 ['all']만 유지
    } else {
      let current = Array.isArray(model.value) ? [...model.value] : [] // 일반 아이템을 클릭했을 때

      current = current.filter((v) => v !== 'all') // 먼저 'all'이 있다면 제거
      if (current.includes(value)) {
        model.value = current.filter((v) => v !== value) // 이미 있으면 제거 (체크 해제)
      } else {
        model.value = [...current, value] // 없으면 추가 (체크 선택)
      }
    }
  } else {
    // 2. 단일 선택 모드일 때
    model.value = value
  }

  emit('change', model.value) // 부모에게 최종 변경 알림
}

// 최상위 루트 클래스
const rootClasses = computed(() => ['root', props.variant, props.size, { round: props.round }])

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
    :class="[rootClasses, $attrs.class]"
  >
    <div :class="['container', { gridColumns: columns !== 'auto' }]" :style="containerStyle">
      <div v-for="(item, i) in data" :key="item.value" class="chip-item">
        <div :class="['chip', item.className]">
          <input
            :type="inputType"
            :id="`${name}-${baseId}-${i}`"
            :name="name"
            :value="item.value"
            :checked="selectedList.includes(item.value)"
            :disabled="item.disabled"
            class="input"
            @change="handleChange(item.value)"
          />
          <label :for="`${name}-${baseId}-${i}`" :class="['label', { disabled: item.disabled }]">
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
