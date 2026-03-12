<template>
  <div class="guide-page">
    <GuideUnit
      name="Icon"
      title="아이콘"
      description="시스템 전반에서 사용되는 SVG 기반 아이콘입니다. 마스크(Mask) 방식을 사용하여 색상 변경이 자유롭습니다."
      :config="componentConfig"
      :initialState="componentState"
    >
      <template #default="{ props }">
        <Icon v-bind="props" />
      </template>
    </GuideUnit>
  </div>
</template>

<script setup>
import { GuideUnit } from '@/views/guide/components'
import { Icon } from '@/components/common'

// 등록된 아이콘 목록
const iconList = [
  'notice',
  'cart',
  'gpsCircle',
  'callCircle',
  'search',
  'close',
  'arrowRight',
  'check',
  'user',
  'settings',
]

// 1. 컨트롤러 옵션 정의
const componentConfig = {
  // 사용 가능한 아이콘 이름 리스트 (프로젝트의 아이콘 목록에 맞춰 수정하세요)
  name: iconList,
  // SCSS의 $icon-size-map과 매칭
  size: ['xsmall', 'small', 'medium', 'large'],
  label: '', // 접근성을 위한 aria-label 입력창
  className: '', // 추가 클래스 테스트
}

// 2. 초기값 정의
const componentState = {
  name: 'notice',
  size: 'medium',
  label: '공지사항 아이콘',
  className: '',
}
</script>
