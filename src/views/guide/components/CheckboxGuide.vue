<template>
  <div class="guide-page">
    <GuideUnit
      name="Checkbox"
      title="Checkbox"
      description="Checkbox가 그룹으로 묶여있는 경우 CheckboxGroup 컴포넌트 사용"
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
  id: '', // 여기에 빈 값을 적었으므로 Default 표에는 '-'가 나옵니다.
  disabled: false,
  error: false,
}

// 2. 초기값 정의
const componentState = {
  variant: undefined,
  size: undefined,
  label: '확인',
  id: undefined,
  disabled: false,
  error: false,
}
</script>
