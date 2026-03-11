<script setup>
import { ref, computed, watch, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 1. 각 컴포넌트별 가이드 파일 임포트
import ButtonGuide from './components/ButtonGuide.vue'
import InputGuide from './components/InputGuide.vue'
import CheckboxGuide from './components/CheckboxGuide.vue'
// import SelectGuide from './components/SelectGuide.vue'

const route = useRoute()
const router = useRouter()

// 2. 가이드 탭 구성 (컴포넌트 객체를 직접 매핑)
// markRaw는 Vue가 컴포넌트 객체를 불필요하게 반응형으로 추적하지 않게 최적화해줍니다.
const guideTabs = {
  button: { name: 'Button', component: markRaw(ButtonGuide) },
  input: { name: 'Input', component: markRaw(InputGuide) },
  checkbox: { name: 'Checkbox', component: markRaw(CheckboxGuide) },
  // select: { name: 'Select', component: markRaw(SelectGuide) },
}

// 3. 현재 선택된 탭 관리
const selectedNav = ref(route.query.tab || 'button')

// 4. 현재 화면에 뿌릴 컴포넌트 계산
const activeComponent = computed(() => {
  return guideTabs[selectedNav.value]?.component || guideTabs['button'].component
})

const handleTabChange = (nav) => {
  selectedNav.value = nav
  router.push({ query: { tab: nav } })
}

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab) selectedNav.value = newTab
  }
)
</script>

<template>
  <div class="guideWrapper">
    <header class="guideHeader">
      <div class="guideInner">
        <div class="headerContent">
          <h1 class="title">퍼블리싱 가이드</h1>
        </div>
      </div>
    </header>

    <nav class="guideNav">
      <div class="guideInner">
        <div class="navTabs">
          <button
            v-for="(tab, key) in guideTabs"
            :key="key"
            :class="['navTab', { active: selectedNav === key }]"
            @click="handleTabChange(key)"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </nav>

    <div class="guideContainer">
      <div class="guideInner">
        <div class="guideContent">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './PublishingList.scss';
</style>
