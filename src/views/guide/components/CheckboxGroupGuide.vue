<template>
  <div class="guide-page">
    <GuideUnit
      name="CheckboxGroup"
      title="CheckboxGroup"
      :config="componentConfig"
      :initialState="componentState"
    >
      <template #default="{ props }">
        <CheckboxGroup v-model="selectedInterests" v-bind="props" />
        <br />
        <div style="margin-top: 20px; font-size: 14px">
          <strong>선택된 값:</strong> {{ selectedInterests }}
        </div>
      </template>
    </GuideUnit>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GuideUnit } from '@/views/guide/components'
import { CheckboxGroup } from '@/components/common'

const selectedInterests = ref(['coding'])

// 1. 컨트롤러에 나타날 옵션 정의
const componentConfig = {
  vertical: {
    default: false,
    description: '세로 정렬 여부',
  },
  disabled: {
    default: false,
    description: '비활성화 여부',
  },
  error: false,
  name: '',
  options: {
    default: '[]',
    description: '체크박스 옵션 배열입니다.',
  },
  // size: ['small', 'medium', 'large']
}

// 2. 초기값 정의
const componentState = {
  vertical: false,
  disabled: false,
  error: false,
  name: 'group-name',
  // 백틱 없이 진짜 배열 데이터 그대로 입력
  options: [
    { value: 'coding', label: '코딩' },
    { value: 'design', label: '디자인' },
    { value: 'design2', label: '디자인2' },
    { value: 'music', label: '음악', disabled: true },
  ],
}
</script>
