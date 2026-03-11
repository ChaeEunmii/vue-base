// 왼쪽메뉴에 뿌려질 메뉴들 샘플
export const menuData = [
  {
    label: '대시보드',
    path: '/',
  },
  {
    label: '시스템 관리',
    children: [
      {
        label: '사용자 관리',
        children: [
          { label: '사용자 목록', path: '/about' },
          { label: '권한 설정', path: '/guide/test' },
        ],
      },
      { label: '사용자 관리', path: '/guide' },
      { label: '메뉴 설정', path: '/guide' },
    ],
  },
  {
    label: '퍼블 가이드',
    children: [
      { label: '공통 컴포넌트', path: '/guide' },
      { label: '아이콘 모음', path: '/guide/icons' },
    ],
  },
]
