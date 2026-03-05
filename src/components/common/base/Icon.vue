<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'medium' },
  label: String,
  className: String, // 부모가 추가로 주는 클래스
})

const iconClasses = computed(() => [
  'icon-root', // 스타일의 .icon-root와 매칭
  props.name, // 스타일의 .notice, .cart 등과 매칭
  props.size, // 스타일의 .small, .large 등과 매칭
  props.className,
])
</script>

<template>
  <i :class="iconClasses" :aria-label="label" :aria-hidden="!label" v-bind="$attrs"></i>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:list';

/* 1. 기본 루트 스타일 */
/* .root 대신 .icon-root로 명확하게 바인딩 */
.icon-root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--icon-color, inherit);
  font-size: var(--icon-size, 24px); // rem 함수가 없다면 px로 우선 테스트
  vertical-align: middle;
  flex-shrink: 0;

  &::before {
    content: '';
    display: inline-block;
    width: 1em;
    aspect-ratio: 1;
    background-color: currentColor;
    mask-image: var(--icon-mask-image);
    mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
  }
}

/* 2. 사이즈 정의 */
$icon-size-map: (
  xsmall: 12,
  small: 16,
  medium: 20,
  large: 24,
);

/* 3. 예외 아이콘 (mask 대신 background-image 사용) */
$bg-icons: gpsCircle, callCircle;

/* 4. 아이콘 생성 루프 */
@each $name, $sizes in $icons {
  // 아이콘 이름 클래스 (예: .notice)
  .#{$name} {
    $first-size: list.nth(map.keys($sizes), 1);
    $fallback-path: map.get($sizes, $first-size);

    @if list.index($bg-icons, $name) {
      &::before {
        mask-image: none !important;
        background-color: transparent !important;
        background-image: url('#{$fallback-path}');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    } @else {
      --icon-mask-image: url('#{$fallback-path}');
    }

    // 각 사이즈별 분기 (예: .notice.small)
    @each $size-name, $size-value in $icon-size-map {
      $path: map.get($sizes, $size-value);
      @if $path {
        &.#{$size-name} {
          --icon-mask-image: url('#{$path}');
        }
      }
    }
  }
}

/* 5. 사이즈별 변수 할당 클래스 (예: .small) */
@each $size-name, $size-value in $icon-size-map {
  .#{$size-name} {
    --icon-size: #{$size-value * 1px}; // rem() 함수가 있다면 rem($size-value * 1px)로 변경
  }
}
</style>
