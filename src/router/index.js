import { createRouter, createWebHashHistory } from 'vue-router'
const home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const create = () =>
  import(/* webpackChunkName: "Create" */ '@/views/Create.vue')
const message = () =>
  import(/* webpackChunkName: "Message" */ '@/views/Message.vue')
const my = () => import(/* webpackChunkName: "My" */ '@/views/My.vue')
const guide = () => import(/* webpackChunkName: "Guide" */ '@/views/Guide.vue')
const login = () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
const singer = () => import(/* webpackChunkName: "Singer" */ '@/views/Singer.vue')
const rank = () => import(/* webpackChunkName: "Singer" */ '@/views/Rank.vue')
const anchor = () => import(/* webpackChunkName: "Anchor" */ '@/views/Anchor.vue')
const live = () => import(/* webpackChunkName: "Live" */ '@/views/Live.vue')
const classify = () => import(/* webpackChunkName: "Classify" */ '@/views/Classify.vue')
const chat = () => import(/* webpackChunkName: "Chat" */ '@/views/Chat.vue')
const play = () => import(/* webpackChunkName: "Play" */ '@/views/Play.vue')
const detail = () => import(/* webpackChunkName: "Detail" */ '@/views/Detail.vue')
const searchDetail = () => import(/* webpackChunkName: "searchDetail" */ '@/views/searchDetail.vue')

const routes = [
  {
    path: '/',
    redirect: '/guide'
  },
  {
    path: '/guide',
    name: 'guide',
    component: guide,
    meta: {
      index: 0
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      index: 1
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      index: 2
    }
  },
  {
    path: '/create',
    name: 'create',
    component: create,
    meta: {
      index: 2
    }
  },
  {
    path: '/message',
    name: 'message',
    component: message,
    meta: {
      index: 2
    }
  },
  {
    path: '/my',
    name: 'my',
    component: my,
    meta: {
      index: 2
    }
  },
  {
    path: '/singer',
    name: 'singer',
    component: singer,
    meta: {
      index: 3
    }
  },
  {
    path: '/rank',
    name: 'rank',
    component: rank,
    meta: {
      index: 3
    }
  },
  {
    path: '/anchor',
    name: 'anchor',
    component: anchor,
    meta: {
      index: 3
    }
  },
  {
    path: '/live',
    name: 'live',
    component: live,
    meta: {
      index: 3
    }
  },
  {
    path: '/classify',
    name: 'classify',
    component: classify,
    meta: {
      index: 3
    }
  },
  {
    path: '/chat/:user',
    name: 'chat',
    component: chat,
    meta: {
      index: 3
    }
  },
  {
    path: '/play',
    name: 'play',
    component: play,
    meta: {
      index: 9
      // keepAlive:true
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    props: true,
    component: detail,
    meta: {
      index: 8
    }
  },
  {
    path: '/searchDetail',
    name: 'searchDetail',
    component: searchDetail,
    meta: {
      index: 8
      // 这个开启 会导致play这个页面乱套
      // keepAlive: true
    }
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
