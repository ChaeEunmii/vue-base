<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  Button,
  Stack,
  Input,
  FormGroup,
  Checkbox,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Select,
} from '@/components/common'
import { useAlert } from '@/hooks/useAlert'

// 1. 여기서 address를 선언합니다 (리액트의 const [address, setAddress] = useState('')와 같음)
const name = ref('seven_nim@naver.com')
const address = ref('서울시 강남구...')

const handleButtonClick = () => {
  alert('네비게이션 버튼이 클릭되었습니다!')
}

const openPostPopup = () => {
  console.log('주소 검색 팝업을 엽니다!')
}

const email = ref('')
const password = ref('')
const password2 = ref('')
const emailError = ref('')

// 유효성 검사 예시
if (!email.value.includes('@')) {
  emailError.value = '올바른 이메일 형식이 아닙니다.'
}

// 체크박스
const isAgreed = ref(false)
const marketing = ref(true)
const mustCheck = ref(false)
// 체크박스그룹
// 초기값으로 '코딩'이 체크된 상태 (배열)
const selectedInterests = ref(['coding'])
const errorMsg = ref('')

// 라디오
const deliveryMethod = ref('standard')
const deliveryError = ref('')
// 라디오그룹
const deliveryMethod2 = ref('option1') // 리액트의 defaultValue 역할
const deliveryError2 = ref('에러메시지')

// select
const selectedCity = ref('') // 선택값 (value)만 담깁니다.

// alert
const { showAlert } = useAlert()
/** 1. 단순 메시지만 띄울 때 */
const handleSimpleAlert = () => {
  showAlert('처리가 완료되었습니다.')
}
/** 2. 제목과 확인/취소가 필요한 경우 */
const handleConfirmAlert = () => {
  showAlert({
    title: '제목',
    message: '정말 삭제하시겠습니까?',
    onConfirm: () => console.log('확인 클릭'),
    showCancel: true,
    labelProps: { confirm: '확인', cancel: '취소' },
  })
}
</script>

<template>
  <RouterLink to="/">Main</RouterLink>
  <RouterLink to="/guide">Component Guide</RouterLink>
  <RouterLink to="/guide/publishing">Publishing List</RouterLink>
  <RouterView />
  <br />
  <Button variant="primary">primary</Button>
  <Button variant="secondary">secondary</Button>
  <Button variant="tertiary">tertiary</Button>
  <Button variant="neutral">neutral</Button>
  <Button variant="ghost">ghost</Button>
  <br />
  <br />
  <Button @btn-click="handleButtonClick">클릭이벤트</Button>
  <Button :isDisabled="true">비활성화</Button>
  <br />
  <br />
  <Button variant="primary" block>primary</Button>
  <Button variant="secondary" block>secondary</Button>
  <Button variant="tertiary" block>tertiary</Button>
  <Button variant="neutral" block>neutral</Button>
  <Button variant="ghost" block>ghost</Button>
  <br />
  <Button variant="secondary" size="xsmall">xsmall</Button>
  <Button variant="secondary" size="small">small</Button>
  <Button variant="secondary" size="medium">medium</Button>
  <Button variant="secondary" size="large">large</Button>
  <Button variant="secondary" size="xlarge">xlarge</Button>
  <br />
  <Stack direction="row" gap="2" alignItems="center">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </Stack>
  <br />
  <Stack direction="column" gap="2" alignItems="center">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </Stack>
  <br />
  <Input v-model="name" placeholder="이름을 입력하세요" block />
  <Input v-model="name" placeholder="이메일을 입력하세요" block />
  <p>실시간 입력값: {{ name }}</p>
  <br />
  <Input
    v-model="address"
    placeholder="주소 검색을 위해 클릭하세요"
    readonly
    @click="openPostPopup"
  />
  <br />
  <br />
  <FormGroup label="이메일 주소" required :error="emailError">
    <Input
      :id="id"
      v-model="email"
      type="email"
      placeholder="example@mail.com"
      :error="!!emailError"
    />
  </FormGroup>
  <FormGroup label="비밀번호" required id="testId">
    <Input v-model="password" type="password" :maxLength="20" />
  </FormGroup>
  <FormGroup label="비밀번호" required id="testId2">
    <Input v-model="password2" type="password" disabled />
  </FormGroup>
  <br />
  <Checkbox v-model="isAgreed" label="개인정보 수집 및 이용에 동의합니다" />
  <p>상태: {{ isAgreed ? '동의함' : '동의 안 함' }}</p>
  <br />
  <div class="p-4">
    <FormGroup label="체크라벨1" helpText="중요 공지사항을 받아봅니다.">
      <Checkbox v-model="marketing" label="마케팅 정보 수신 동의" variant="boxed" />
    </FormGroup>

    <FormGroup label="체크라벨2" :error="!mustCheck ? '필수 항목에 체크해주세요' : ''">
      <Checkbox v-model="mustCheck" label="로봇이 아닙니다" :invalid="!mustCheck" />
    </FormGroup>
  </div>
  <FormGroup label="관심사 선택" desc="여러 개 선택 가능합니다." :error="errorMsg">
    <CheckboxGroup
      v-model="selectedInterests"
      :options="[
        { value: 'coding', label: '코딩' },
        { value: 'design', label: '디자인' },
        { value: 'design2', label: '디자인2' },
        { value: 'music', label: '음악', disabled: true },
      ]"
      vertical
    />
  </FormGroup>
  <p>선택된 항목: {{ selectedInterests }}</p>
  <br />
  <br />
  <FormGroup label="배송 방법" :error="deliveryError">
    <div class="flex gap-4">
      <Radio v-model="deliveryMethod" value="standard" label="일반 배송" />
      <Radio v-model="deliveryMethod" value="express" label="새벽 배송" />
    </div>
  </FormGroup>
  <p>선택된 값: {{ deliveryMethod }}</p>
  <br />
  <FormGroup label="라디오" desc="설명 메시지" :error="deliveryError2" required>
    <RadioGroup
      name="radio-option"
      v-model="deliveryMethod2"
      :options="[
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3', disabled: true },
      ]"
      :error="true"
    />
  </FormGroup>
  <br />
  <br />
  <br />
  <FormGroup label="도시 선택">
    <Select
      v-model="selectedCity"
      :options="[
        { label: '서울', value: 'seoul' },
        { label: '부산', value: 'busan' },
        { label: '제주', value: 'jeju', disabled: true },
      ]"
      placeholder="도시를 골라주세요"
    />
  </FormGroup>
  <br />
  <div class="p-20">
    <Button @click="handleSimpleAlert">기본 알럿</Button>
    <Button @click="handleConfirmAlert">삭제 알럿</Button>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>
<style lang="scss" scoped></style>
