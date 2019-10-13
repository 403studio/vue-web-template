import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Home from '@/views/Home.vue'

Vue.use(Router)

let routes = []

const requireContext = require.context(
  './',
  true,
  /\.js$/
)
requireContext.keys().forEach(filename => {
  if (filename === './index.js') return
  const routerModule = requireContext(filename)
  routes = [...routes, ...(routerModule.default || routerModule)]
})

const router = new Router({
  routes
})
router.addRoutes([
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
])
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
