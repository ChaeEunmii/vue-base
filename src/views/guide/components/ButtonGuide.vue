<template>
  <div class="guide-page">
    <GuideUnit
      name="Button"
      title="버튼"
      description="서비스 전반에서 사용되는 기본 버튼입니다. 다양한 크기와 상태를 지원합니다."
      :config="buttonConfig"
      :initialState="buttonState"
    >
      <template #default="{ props }">
        <Button v-bind="props">{{ props.slotText }}</Button>
      </template>
    </GuideUnit>
  </div>
</template>

<script setup>
import { GuideUnit } from '@/views/guide/components'
import { Button } from '@/components/common'

// 1. 컨트롤러에 나타날 옵션 정의
const buttonConfig = {
  variant: ['primary', 'secondary', 'tertiary', 'neutral', 'ghost'],
  size: ['xlarge', 'large', 'medium', 'small', 'xsmall'],
  rounded: true, // boolean이면 체크박스로 나옴
  block: true,
  slotText: '', // 텍스트 입력창으로 나옴
}

// 2. 초기값 정의
const buttonState = {
  variant: 'primary',
  size: 'medium',
  rounded: false,
  block: false,
  slotText: '확인',
}
</script>
