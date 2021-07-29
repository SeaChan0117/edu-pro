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
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          title: '课程管理'
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          title: '广告管理'
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
        meta: {
          title: '广告位管理'
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          title: '课程管理'
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
        meta: {
          title: '资源管理'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'),
        meta: {
          title: '创建菜单'
        }
      },
      {
        path: '/menu/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue'),
        meta: {
          title: '编辑菜单'
        }
      },
      {
        path: '/resource-category',
        name: 'resource-category',
        component: () => import(/* webpackChunkName: 'resource-category' */ '@/views/resource/ResourceCategory.vue'),
        meta: {
          title: '资源分类'
        }
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkNameL 'alloc-menu' */ '@/views/role/AllocMenu.vue'),
        props: true, // 将路由参数映射到组件的 props 数据中
        meta: {
          title: '分配菜单'
        }
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkNameL 'alloc-resource' */ '@/views/role/AllocResource.vue'),
        props: true,
        meta: {
          title: '分配资源'
        }
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkNameL 'course-create' */ '@/views/course/create.vue'),
        meta: {
          title: '创建课程'
        }
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkNameL 'course-edit' */ '@/views/course/edit.vue'),
        props: true,
        meta: {
          title: '编辑课程'
        }
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkNameL 'course-section' */ '@/views/course/section.vue'),
        props: true,
        meta: {
          title: '课程内容管理'
        }
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkNameL 'course-video' */ '@/views/course/video.vue'),
        props: true,
        meta: {
          title: '课时视频上传'
        }
      },
      {
        path: '/advert/create',
        name: 'advert-create',
        component: () => import(/* webpackChunkNameL 'advert-create' */ '@/views/advert/create.vue'),
        meta: {
          title: '创建广告'
        }
      },
      {
        path: '/advert/:advertId/edit',
        name: 'advert-edit',
        component: () => import(/* webpackChunkNameL 'advert-create' */ '@/views/advert/edit.vue'),
        props: true,
        meta: {
          title: '编辑广告'
        }
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
