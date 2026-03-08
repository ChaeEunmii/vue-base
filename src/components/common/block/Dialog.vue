<script setup>
import { ref, onUnmounted, watch, useId } from 'vue'
import { FocusTrap } from '@/components/common'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  divider: { type: Boolean, default: false },
  className: String,
  bodyClassName: String,
  maximize: Boolean,
  mode: String, // 'gray' | 'black' | 'dimmed'
  showClose: Boolean,
  flush: Boolean,
  portalTarget: { type: String, default: 'body' },
})

// emits 정의
const emit = defineEmits(['close', 'open'])

const titleId = `modal-label--${useId()}`
const vh = ref(0)

// 1. 뷰포트 높이(vh) 계산 로직 (컴포넌트 내부로 흡수)
const updateVh = () => {
  vh.value = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--layout-vh', `${vh.value}px`)
}

// 2. 스크롤 잠금 및 이벤트 관리
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      updateVh()
      window.addEventListener('resize', updateVh)
      document.documentElement.classList.add('no-scroll')
      emit('open') // 모달이 열릴 때 부모에게 알림
    } else {
      window.removeEventListener('resize', updateVh)
      document.documentElement.classList.remove('no-scroll')
      emit('close') // 모달이 닫히는 시점에 부모에게 알림
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  window.removeEventListener('resize', updateVh)
  // 컴포넌트가 파괴될 때 혹시 남아있을지 모를 클래스 확실히 제거
  document.documentElement.classList.remove('no-scroll')
})
</script>

<template>
  <Teleport :to="props.portalTarget">
    <Transition name="fade">
      <FocusTrap :isActive="props.isOpen" @exit="emit('close')">
        <div v-if="props.isOpen" class="overlay" @click.self="emit('close')">
          <div
            :class="[
              'root',
              props.maximize ? 'maximize' : '',
              props.mode ? `mode-${props.mode}` : '',
              props.className,
            ]"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="props.title ? titleId : undefined"
          >
            <div v-if="props.title" class="header">
              <h2 :id="titleId" class="title">{{ props.title }}</h2>
            </div>

            <button v-if="props.showClose" type="button" class="btn-close" @click="emit('close')">
              <span class="blind">닫기</span>
            </button>

            <div v-if="$slots.navBar" class="nav-bar">
              <slot name="navBar"></slot>
            </div>

            <div
              :class="[
                'body',
                props.divider ? 'divider' : '',
                props.flush ? 'flush' : '',
                props.bodyClassName,
              ]"
            >
              <slot></slot>
            </div>

            <div v-if="$slots.footer" class="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </FocusTrap>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.overlay {
  @include position($p: fixed, $t: 0, $l: 0, $i: 1000);
  width: 100%;
  /* 훅 없이도 내부 vh 변수로 계산 가능 */
  height: calc(var(--layout-vh, 1vh) * 100);
  @include flex($h: center, $v: center);
  background-color: var(--color-alpha-dim);
}

.root {
  background-color: var(--color-background);
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - var(--layout-padding-x) * 2);
  max-width: 500px;
  border-radius: var(--border-radius-base);

  &.maximize {
    width: 100%;
    height: 100%;
    max-width: none;
    border-radius: 0;
  }
}

.body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-x20);
  &.flush {
    padding: 0;
  }
  &.divider {
    border-top: 1px solid var(--color-border);
  }
}

/* 페이드 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
