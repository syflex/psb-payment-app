
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'login', name: 'login', component: () => import('pages/login.vue') },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/dashboard.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
