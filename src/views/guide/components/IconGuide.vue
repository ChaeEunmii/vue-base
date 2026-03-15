<template>
  <div class="guide-page">
    <GuideUnit
      name="Icon"
      title="아이콘 (Icon)"
      description="시스템 전반에서 사용되는 SVG 기반 아이콘입니다. mask-image 방식을 사용하여 컬러 제어가 용이합니다."
      :config="componentConfig"
      :initialState="componentState"
      :stories="iconSectionStory"
    >
      <template #default="{ props }">
        <Icon v-bind="props" />
      </template>

      <template #story>
        <div class="icon-grid-layout">
          <div v-for="iconName in ICON_NAMES" :key="iconName" class="icon-card-static">
            <div class="icon-visual">
              <Icon :name="iconName" size="large" />
            </div>
            <div class="icon-info">
              <span class="icon-name">{{ iconName }}</span>
              <!-- <code class="icon-code">name="{{ iconName }}"</code> -->
            </div>
          </div>
        </div>
      </template>

      <template #cases><div>아이콘으로 사용가능</div></template>
    </GuideUnit>
  </div>
</template>

<script setup>
import { GuideUnit } from '@/views/guide/components'
import { Icon } from '@/components/common'
import { ICON_NAMES, ICON_SIZES } from '@/components/common/base/Icon.vue'

const componentConfig = {
  name: {
    description: '아이콘 리소스 이름',
    options: [...ICON_NAMES],
    default: 'notice',
  },
  size: {
    description: '아이콘 크기',
    options: [...ICON_SIZES],
    default: 'medium',
  },
}

const componentState = {
  name: 'notice',
  size: 'medium',
}

/**
 * 💡 스토리 섹션의 타이틀과 설명을 쓰기 위해
 * 데이터는 하나만 정의합니다.
 */
const iconSectionStory = [
  {
    name: 'Icon List',
    description: 'name="" 으로 사용 가능한 전체 아이콘 목록',
    args: {}, // 개별 아이콘 데이터 대신 리스트를 통째로 보여줄 것이므로 비워둠
  },
]
</script>
<style lang="scss" scoped>
/* 💡 GuideUnit 내부 스토리 레이아웃 조정 */
:deep(.sb-stories-section) {
  .canvas-preview {
    padding: 0; // 그리드 라인을 끝까지 채우기 위해 0으로 조정
    background: #fff !important;
  }
  .canvas-footer {
    display: none;
  }
}

.icon-grid-layout {
  display: grid;
  /* 세로형일 때는 가로를 조금 더 좁게 배치 (한 줄에 더 많이 보이게) */
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  /* 별도의 gap 대신 border로 구분감을 줍니다 */
}

/* 💡 세로형 아이콘 카드 */
.icon-card-static {
  display: flex;
  flex-direction: column; // 세로 배치
  align-items: center;
  justify-content: center;
  padding: 24px 12px;
  background: transparent;

  /* 💡 아이콘 간의 구분을 위한 연한 라인 */
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  // 마지막 열과 행에서 라인이 겹치거나 비는 건 그리드가 알아서 처리

  .icon-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-bottom: 12px; // 아이콘과 텍스트 사이 간격
    color: #111;
  }

  .icon-info {
    display: flex;
    flex-direction: column;
    align-items: center; // 텍스트도 중앙 정렬
    width: 100%;
    gap: 4px;

    .icon-name {
      font-size: 12px;
      font-weight: 600;
      color: #333;
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .icon-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 10px;
      color: #aaa;
      background: transparent;
      padding: 0;
      text-align: center;
    }
  }
}
</style>
