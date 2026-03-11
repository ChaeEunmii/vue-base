import { createRouter, createWebHistory } from 'vue-router'
// 레이아웃
import BaseLayout from '@/layouts/BaseLayout.vue'
// 페이지
import HomeView from '../views/HomeView.vue'

// guide pages
import GuideView from '@/views/guide/GuideView.vue'
import PublishingList from '@/views/guide/PublishingList.vue'
import GuideTestView from '@/views/guide/GuideTestView.vue'
import PubView from '@/views/guide/PubView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout, // 레이아웃 전용 부모
      // meta: { title: '시스템 관리' },
      children: [
        { path: '', component: HomeView },
        {
          path: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        // 퍼블리싱 샘플화면
        {
          path: '/pub/:screenId', // 화면 ID를 파라미터로 받음
          name: 'PubView',
          component: PubView,
          props: true, // 파라미터를 컴포넌트의 props로 전달
        },

        // { path: 'mypage', component: MypageView },
        // { path: 'mypage/detail', component: MypageDetailView },
      ],
    },
    // {
    //   path: '/login',
    //   component: () => import('@/pages/Login.vue'),
    // },
    // 퍼블리싱 가이드
    {
      path: '/guide',
      name: 'Guide',
      component: GuideView,
    },
    // 퍼블리싱 가이드 테스트
    {
      path: '/guide/test',
      name: 'GuideTest',
      component: GuideTestView,
    },
    // 퍼블리싱 목록
    {
      path: '/guide/publishing',
      name: 'PublishingList',
      component: PublishingList,
    },
  ],
})

export default router
