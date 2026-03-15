<template>
  <Dialog
    :is-open="modelValue"
    title="샘플 알림"
    v-bind="$attrs"
    @open="emit('open')"
    @close="onClose"
  >
    <div class="sample-content">
      <p>이것은 본문 내용입니다.</p>

      <div style="margin-top: 16px">
        <Button variant="primary" block @click="onConfirm"> 확인 </Button>
      </div>
    </div>

    <template #footer>
      <Button variant="neutral" block @click="onClose"> 닫기 </Button>
    </template>
  </Dialog>
</template>

<script setup>
import { Dialog, Button } from '@/components/common'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue', 'confirm', 'open', 'close'])

// 닫힘 이벤트
const onClose = () => {
  if (props.modelValue) {
    emit('update:modelValue', false) // 부모 v-model 업데이트
    emit('close') // 부모 @close 이벤트 트리거
  }
}

// 확인 버튼 클릭 시 실행 샘플
const onConfirm = () => {
  emit('confirm')
  onClose()
}
</script>
