import { createRouter, createWebHistory } from 'vue-router'
// 레이아웃
import BaseLayout from '@/layouts/BaseLayout.vue'
// 페이지
import HomeView from '../views/HomeView.vue'

// guide pages
import GuideView from '@/views/guide/GuideView.vue'
import PublishingList from '@/views/guide/PublishingList.vue'
import GuideTestView from '@/views/guide/GuideTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout, // 레이아웃 전용 부모
      children: [
        { path: '', component: HomeView },
        { path: 'about', component: () => import('../views/AboutView.vue') },

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
