<template>
  <div class="guide-page">
    <GuideUnit
      name="Button"
      title="버튼 (Button)"
      description="서비스 전반에서 사용되는 기본 버튼 컴포넌트입니다. 테마, 크기, 라운드 여부 등을 설정할 수 있습니다."
      :config="componentConfig"
      :initialState="componentState"
      :stories="componentStories"
      caseTitle="Button Examples"
    >
      <template #default="{ props }">
        <Button v-bind="props">
          {{ props.slotText }}
        </Button>
      </template>

      <template #story="{ args }">
        <Button v-bind="args">
          {{ args.slotText }}
        </Button>
      </template>
    </GuideUnit>
  </div>
</template>

<script setup>
import { GuideUnit } from '@/views/guide/components'
import { Button } from '@/components/common'
import { ICON_NAMES } from '@/components/common/base/Icon.vue'

/**
 * 1. 컨트롤러 설정 (config)
 */
const componentConfig = {
  variant: {
    description: '버튼 스타일',
    options: ['primary', 'secondary', 'tertiary', 'neutral', 'ghost'],
    default: 'secondary',
  },
  size: {
    description: '버튼 크기',
    options: ['small', 'medium', 'large'],
    default: 'medium',
  },
  block: {
    description: '가로 너비 100% 채움',
    default: false,
  },
  prefixIcon: {
    description: '왼쪽 아이콘 이름',
    options: [...ICON_NAMES], // 아이콘 목록 연결
    default: undefined,
  },
  suffixIcon: {
    description: '오른쪽 아이콘 이름',
    options: [...ICON_NAMES],
    default: undefined,
  },
  iconOnly: {
    description: '아이콘만 사용 (텍스트 숨김)',
    options: [...ICON_NAMES],
    default: undefined,
  },
  slotText: {
    description: '버튼 텍스트 내용',
    default: '확인',
  },
  isDisabled: {
    description: '비활성화 여부',
    default: false,
  },
}

/**
 * 2. 가이드 초기 상태 (initialState)
 */
const componentState = {
  variant: undefined,
  size: undefined,
  block: false,
  prefixIcon: undefined,
  suffixIcon: undefined,
  iconOnly: undefined,
  slotText: '확인',
  isDisabled: false,
}

/**
 * 3. 💡 스토리북 스타일 케이스 데이터 (stories)
 * - 이 배열에 객체를 추가하면 하단에 자동으로 섹션이 생성됩니다.
 */
const componentStories = [
  {
    name: 'Primary Large',
    description: '가장 강조되는 메인 버튼 스타일입니다.',
    args: { variant: 'primary', size: 'large', slotText: '시작하기' },
  },
  {
    name: 'Neutral Rounded',
    description: '부드러운 인상을 주는 라운드 처리된 중립 버튼입니다.',
    args: { variant: 'neutral', rounded: true, slotText: '더보기' },
  },
  {
    name: 'Ghost Full Width',
    description: '배경이 없고 가로를 꽉 채우는 고스트 버튼입니다.',
    args: { variant: 'ghost', block: true, slotText: '목록으로' },
  },
  {
    name: 'Small Tertiary',
    description: '부가적인 액션에 사용되는 작은 사이즈의 버튼입니다.',
    args: { variant: 'tertiary', size: 'small', slotText: '수정' },
  },
]
</script>
