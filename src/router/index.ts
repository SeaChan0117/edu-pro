import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requireAuth: true // 自定义数据
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
      },
      {
        path: '/resource-category',
        name: 'resource-category',
        component: () => import(/* webpackChunkName: 'resource-category' */ '@/views/resource/ResourceCategory.vue')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkNameL 'alloc-menu' */ '@/views/role/AllocMenu.vue'),
        props: true // 将路由参数映射到组件的 props 数据中
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkNameL 'alloc-resource' */ '@/views/role/AllocResource.vue'),
        props: true
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkNameL 'course-create' */ '@/views/course/create.vue')
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkNameL 'course-edit' */ '@/views/course/edit.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkNameL 'course-section' */ '@/views/course/section.vue'),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkNameL 'course-video' */ '@/views/course/video.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫，任何页面的访问都会经过这里
router.beforeEach((to, from, next) => {
  // to.matched: 匹配到的路由记录
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    next()
  } else {
    next()
  }
})

export default router
