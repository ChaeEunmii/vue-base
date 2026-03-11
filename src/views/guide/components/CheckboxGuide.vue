<template>
  <div class="guide-page">
    <GuideUnit
      name="Checkbox"
      title="버튼"
      description="서비스 전반에서 사용되는 기본 버튼입니다. 다양한 크기와 상태를 지원합니다."
      :config="componentConfig"
      :initialState="componentState"
    >
      <template #default="{ props }">
        <Checkbox v-bind="props" v-model="isAgreed" :label="props.label" :id="props.id" />
        <p>상태: {{ isAgreed ? '동의함' : '동의 안 함' }}</p>
      </template>
    </GuideUnit>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GuideUnit } from '@/views/guide/components'
import { Checkbox } from '@/components/common'

const isAgreed = ref(false)

// 1. 컨트롤러에 나타날 옵션 정의
const componentConfig = {
  variant: ['default', 'boxed'],
  size: ['small', 'medium'],
  label: '레이블',
  id: '',
  disabled: false,
  error: false,
}

// 2. 초기값 정의
const componentState = {
  variant: 'default',
  size: 'medium',
  label: '확인',
  id: '',
  disabled: false,
  error: false,
}
</script>
