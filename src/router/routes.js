
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'login', name: 'login', component: () => import('pages/login.vue') },
      { path: 'home', name: 'home', component: () => import('pages/home.vue') },
      { path: 'suppliers', name: 'suppliers', component: () => import('pages/suppliers.vue') },
      { path: 'wallet', name: 'wallet', component: () => import('pages/wallet.vue') },
      { path: 'verify-payment', name: 'verify-payment', component: () => import('pages/verify-payment.vue') },
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
