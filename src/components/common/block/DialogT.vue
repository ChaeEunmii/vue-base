<script setup>
import { ref, onUnmounted, watch, useId, nextTick } from 'vue'
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

const emit = defineEmits(['close', 'open'])
const titleId = `modal-label--${useId()}`
const vh = ref(0)

// 1. 뷰포트 높이 계산
const updateVh = () => {
  vh.value = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--layout-vh', `${vh.value}px`)
}

// 2. 스크롤 잠금 제어 함수
const toggleScrollLock = (isLock) => {
  if (typeof document === 'undefined') return // SSR 대응
  
  if (isLock) {
    document.documentElement.classList.add('no-scroll')
  } else {
    document.documentElement.classList.remove('no-scroll')
  }
}

// 3. 상태 감시
watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      // DOM이 완전히 업데이트된 후 실행되도록 보장
      await nextTick()
      updateVh()
      window.addEventListener('resize', updateVh)
      toggleScrollLock(true)
      emit('open')
    } else {
      window.removeEventListener('resize', updateVh)
      toggleScrollLock(false)
      // watch 내부에서 emit('close')를 강제 호출하면 
      // 부모 상태에 따라 중복 발생할 수 있으므로 필요 시에만 사용하세요.
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  window.removeEventListener('resize', updateVh)
  toggleScrollLock(false)
})
</script>

<template>
  <Teleport :to="props.portalTarget">
    <Transition name="fade">
      <FocusTrap 
        :isActive="props.isOpen" 
        :clickOutsideDeactivates="false"
        :escapeDeactivates="false" 
      >
        <div v-if="props.isOpen" class="overlay">
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
  height: calc(var(--layout-vh, 1vh) * 100);
  @include flex($h: center, $v: center);
  background-color: var(--color-alpha-dim);
  /* 클릭 이벤트가 자식에게만 전달되도록 보장 */
  pointer-events: auto;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
