import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import addCandidate from '@/components/content/addCandidate'
import receptionList from '@/components/content/receptionList'
import login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/add_candidate',
      children: [
        {
          path: 'add_candidate',
          component: addCandidate,
          name: 'addCandidate',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'reception_list',
          component: receptionList,
          name: 'receptionList',
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
