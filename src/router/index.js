import Vue from 'vue'
import Router from 'vue-router'
import addCandidate from '@/components/content/addCandidate'
import receptionList from '@/components/content/receptionList'
import index from '@/components/index'
import login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/add_candidate'
    },
    {
      path: '/index',
      component: index,
      name: 'index',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/add_candidate',
      component: addCandidate,
      name: 'addCandidate',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/reception_list',
      component: receptionList,
      name: 'receptionList',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
