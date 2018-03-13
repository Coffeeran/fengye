// the vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import fastclick from 'fastclick'
import router from './router'
import App from './app'
import {AjaxPlugin, ToastPlugin} from 'vux'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

Vue.use(MuseUI)
Vue.use(AjaxPlugin)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    AjaxPlugin.$http.post(process.env.API_HOST + 'user/get_user_info.do').then(function (res) {
      if (res.data.status === 0) {
        Vue.prototype.user = res.data.data
        next()
      } else {
        next({
          name: 'login'
        })
      }
    })
  } else {
    next()
  }
})

fastclick.attach(document.body)
Vue.config.productiontip = false
Vue.use(ToastPlugin)

Vue.prototype.DateTimeUtil = function (str) {
  const year = str.substr(0, 4)
  const month = str.substr(4, 2)
  const date = str.substr(6, 2)
  return new Date(year, month - 1, date)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: {App}
})
