
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'login', name: 'login', component: () => import('pages/login.vue') },
      { path: 'home', name: 'home', component: () => import('pages/home.vue'), meta: { requiresAuth: true } },
      { path: 'suppliers', name: 'suppliers', component: () => import('pages/suppliers.vue'), meta: { requiresAuth: true } },
      { path: 'wallet', name: 'wallet', component: () => import('pages/wallet.vue'), meta: { requiresAuth: true } },
      { path: 'verify-payment', name: 'verify-payment', component: () => import('pages/verify-payment.vue') },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/dashboard.vue'), meta: { requiresAuth: true } },
      { path: 'settings', name: 'settings', component: () => import('pages/settings.vue'), meta: { requiresAuth: true } }
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
