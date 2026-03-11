<template>
  <li
    class="nav-item"
    :class="[`depth-${depth}`, { 'is-expanded': isOpen }]"
    :style="{ '--depth': depth }"
  >
    <div class="menu-row" @click="toggleMenu">
      <div class="menu-content" :style="{ paddingLeft: depth * 15 + 20 + 'px' }">
        <router-link v-if="item.path" :to="item.path" class="menu-link">
          {{ item.label }}
        </router-link>
        <span v-else class="menu-text">{{ item.label }}</span>
      </div>

      <span v-if="hasChildren" class="arrow-icon">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>

    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <ul v-if="hasChildren && isOpen" class="sub-menu">
        <SideNavItem
          v-for="child in item.children"
          :key="child.label"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </transition>
  </li>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SideNavItem from './SideNavItem.vue'

const props = defineProps({
  item: Object,
  depth: { type: Number, default: 0 },
})

const route = useRoute()
const isOpen = ref(false)
const hasChildren = computed(() => props.item.children?.length > 0)

// 현재 경로 기반 자동 펼침
const checkAndExpand = () => {
  if (!props.item.children) return false

  // 자식들 중에 현재 URL과 일치하는 놈이 있는지 검사 (재귀)
  const hasActiveChild = (children) => {
    return children.some((child) => {
      if (child.path === route.path) return true
      if (child.children) return hasActiveChild(child.children)
      return false
    })
  }

  if (hasActiveChild(props.item.children)) {
    isOpen.value = true
  }
}

// 초기 로드(새로고침) 시 실행
onMounted(() => {
  checkAndExpand()
})

// 페이지 이동 시에도 체크 (다른 메뉴 클릭 시 자동으로 닫히지 않게 하거나 새로 열 때 필요)
watch(
  () => route.path,
  () => {
    checkAndExpand()
  }
)

const toggleMenu = () => {
  if (hasChildren.value) isOpen.value = !isOpen.value
}

// 슬라이딩
const enter = (el) => {
  el.style.height = '0'
  el.offsetHeight // reflow trigger
  el.style.height = el.scrollHeight + 'px'
}
const afterEnter = (el) => {
  el.style.height = 'auto'
}
const leave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight // reflow trigger
  el.style.height = '0'
}
const afterLeave = (el) => {
  el.style.height = ''
}
</script>

<style scoped>
.nav-item {
  list-style: none;
  user-select: none;
}
.menu-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}
.menu-content {
  flex: 1;
  display: flex;
  align-items: center;
}
.menu-link,
.menu-text {
  text-decoration: none;
  width: 100%;
  display: block;
  color: inherit;
}

/* --- 뎁스별 스타일링 --- */
/* 1Depth */
.depth-0 > .menu-row {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}
.depth-0 > .menu-row .menu-text,
.depth-0 > .menu-row .menu-link {
  font-weight: 700;
  font-size: 15px;
  color: #1a1a1a;
}
/* 2Depth */
.depth-1 > .menu-row {
  background-color: #f9f9f9;
}
.depth-1 > .menu-row .menu-text,
.depth-1 > .menu-row .menu-link {
  font-weight: 500;
  font-size: 14px;
  color: #444;
}
/* 3Depth 이상 */
.depth-2 > .menu-row {
  background-color: #f2f2f2;
}
.depth-2 > .menu-row .menu-text,
.depth-2 > .menu-row .menu-link {
  font-weight: 400;
  font-size: 13px;
  color: #666;
}
/* Hover 상태 */
.menu-row:hover {
  background-color: #f0f4ff !important;
  color: #3b82f6;
}

/* --- 활성화 강조 스타일 --- */
/* 1. 현재 선택된 파일(Exact Active) */
.menu-link.router-link-exact-active {
  color: #ff0000 !important;
  font-weight: 700 !important;
}
/* 2. 현재 선택된 메뉴를 포함하고 있는 부모 카테고리 강조 */
.nav-item:has(.router-link-exact-active) > .menu-row .menu-text,
.nav-item:has(.router-link-exact-active) > .menu-row .menu-link {
  color: #ff0000;
  font-weight: bold;
}
/* Arrow Icon 애니메이션 */
.arrow-icon {
  margin-right: 20px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  color: #ccc;
}
.is-expanded > .menu-row .arrow-icon {
  transform: rotate(180deg);
}
.sub-menu {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
/* Transition 클래스 */
.expand-enter-active,
.expand-leave-active {
  transition:
    height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s;
}
</style>
