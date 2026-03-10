<template>
  <li class="nav-item" :class="{ 'is-expanded': isOpen }">
    <div class="menu-row" @click="toggleMenu">
      <router-link v-if="item.path" :to="item.path" class="menu-link">
        {{ item.label }}
      </router-link>
      <span v-else class="menu-text">{{ item.label }}</span>
      <span v-if="hasChildren" class="arrow">▼</span>
    </div>

    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <ul v-if="hasChildren && isOpen" class="sub-menu">
        <SideNavItem v-for="child in item.children" :key="child.label" :item="child" />
      </ul>
    </transition>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideNavItem from './SideNavItem.vue'

const props = defineProps({ item: Object })
const isOpen = ref(false)
const hasChildren = computed(() => props.item.children?.length > 0)

const toggleMenu = () => {
  if (hasChildren.value) isOpen.value = !isOpen.value
}

// --- 자연스러운 슬라이딩 스크립트 ---
const enter = (el) => {
  el.style.height = '0'
  el.style.opacity = '1' // 색상은 처음부터 진하게 유지
  el.offsetHeight // reflow
  el.style.height = el.scrollHeight + 'px'
}

const afterEnter = (el) => {
  el.style.height = 'auto'
}

const leave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight // reflow
  el.style.height = '0'
}

const afterLeave = (el) => {
  el.style.height = ''
}
</script>

<style scoped>
.nav-item {
  list-style: none;
}

.menu-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  color: #333;
}

.menu-link {
  color: inherit;
  text-decoration: none;
  width: 100%;
}
.menu-text {
  font-weight: 500;
}

.arrow {
  font-size: 10px;
  transition: transform 0.3s ease;
}
.is-expanded > .menu-row .arrow {
  transform: rotate(180deg);
}

.sub-menu {
  background-color: #eeeeee;
  padding-left: 15px;
  margin: 0;
  list-style: none;
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Transition 컴포넌트 필수 클래스 */
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
