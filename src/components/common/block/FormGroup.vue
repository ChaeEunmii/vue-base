<script setup>
import { provide, useId } from 'vue'

const props = defineProps({
  /** 외부에서 직접 지정할 ID (없으면 자동 생성) */
  id: { type: String, default: undefined },
  /** 라벨 텍스트 */
  label: { type: String, default: '' },
  /** 필수 입력 여부 (*) */
  required: Boolean,
  /** 에러 메시지 */
  error: { type: String, default: '' },
  /** 헬프 텍스트 */
  helpText: { type: String, default: '' },
})

/**
 * [ID 결정 로직]
 * 1. props.id가 들어오면 우선 사용
 * 2. 없으면 useId()로 고유 ID 생성
 */
const generatedId = props.id || useId()

// 'form-group-id'라는 이름으로 ID를 전송합니다. (리액트 Context.Provider 역할)
provide('form-group-id', generatedId)
</script>

<template>
  <div class="form-group-root" :class="{ 'has-error': !!props.error }">
    <div v-if="props.label" class="label-area">
      <label :for="generatedId" class="group-label">
        {{ props.label }}
        <span v-if="props.required" class="required-dot">*</span>
      </label>
    </div>

    <div class="group-content">
      <slot :id="generatedId"></slot>

      <p v-if="props.error" class="error-message">{{ props.error }}</p>
      <p v-else-if="props.helpText" class="help-text">{{ props.helpText }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-group-root {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label-area {
    display: flex;
    align-items: center;

    .group-label {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
      cursor: pointer;

      .required-dot {
        color: #f56c6c;
        margin-left: 4px;
      }
    }
  }

  .group-content {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .error-message {
      font-size: 12px;
      color: #f56c6c;
      margin: 0;
    }

    .help-text {
      font-size: 12px;
      color: #909399;
      margin: 0;
    }
  }
}
</style>
