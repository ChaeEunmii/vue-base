<script setup>
import { provide, useId, computed } from 'vue'

const props = defineProps({
  /** 외부에서 직접 지정할 ID (없으면 자동 생성) */
  id: { type: String, default: undefined },
  /** 라벨 텍스트 */
  label: { type: String, default: '' },
  /** label 태그 대신 다른태그 사용여부 */
  tag: {
    type: String,
    default: 'label',
    validator: (v) => ['label', 'div', 'fieldset'].includes(v),
  },
  /** 필수 입력 여부 (*) */
  required: Boolean,
  /** 에러 메시지 */
  error: { type: String, default: '' },
  /** 헬프 텍스트 */
  helpText: { type: String, default: '' },
  /** 그룹 여부 (레이블태그 미사용 여부) */
  isGroup: Boolean,
})

// label 태그 미사용 태그 렌더링
const isLabelTag = computed(() => props.tag === 'label')

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
      <component :is="props.tag" :for="isLabelTag ? generatedId : undefined" class="group-label">
        {{ props.label }}
        <span v-if="props.required" class="required-dot">*</span>
      </component>
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
      display: inline-block; // div일 때도 label처럼 보이게 처리
      font-size: 14px;
      font-weight: 600;
      color: #303133;
      &[for] {
        cursor: pointer; // label일 때만 포인터 커서
      }

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
