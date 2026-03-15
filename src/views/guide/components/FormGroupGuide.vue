<template>
  <div class="guide-page">
    <GuideUnit
      name="FormGroup"
      title="FormGroup"
      description="레이블, 필수 표시, 에러 메시지 등을 관리하며 내부 슬롯에 고유 ID를 전달합니다."
      :config="componentConfig"
      :initialState="componentState"
    >
      <template #default="{ props: unitProps }">
        <FormGroup v-bind="unitProps">
          <Input
            v-model="inputValue"
            :error="!!unitProps.error"
            placeholder="내용을 입력해주세요"
          />
        </FormGroup>
      </template>

      <template #example>
        <GuideSourceBox :source="selfSource" id="ex1">
          <!-- 이메일주소 -->
          <FormGroup label="이메일 주소" required>
            <Input v-model="inputValue" placeholder="example@email.com" />
          </FormGroup>
        </GuideSourceBox>
      </template>
    </GuideUnit>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GuideUnit, GuideSourceBox } from '@/views/guide/components'
import selfSource from './FormGroupGuide.vue?raw'
import { FormGroup, Input } from '@/components/common'

const inputValue = ref('')

const componentConfig = {
  label: '레이블',
  tag: ['label', 'div'],
  required: false,
  helpText: '도움말 문구',
  error: '에러 메시지',
  id: '아이디',
}

const componentState = {
  label: '이름',
  tag: undefined,
  required: true,
  helpText: '영문, 숫자 조합으로 6~12자 이내로 입력하세요.',
  error: '',
  id: '',
  slotText: `<Input v-model="inputValue" placeholder="내용을 입력해주세요" />`,
}

// 💡 관리 포인트: 여기서만 코드를 수정하세요.
// 템플릿의 #example 슬롯에는 이 내용을 복사해서 넣기만 하면 됩니다.
const formGroupExampleCode = `
<FormGroup label="이메일 주소" required helpText="비밀번호 찾기 시 사용됩니다.">
  <Input v-model="inputValue" placeholder="example@email.com" />
</FormGroup>
`.trim()
</script>

<style lang="scss" scoped>
.guide-page {
  background-color: #fff;
}
</style>
