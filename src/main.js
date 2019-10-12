import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import studentEdit from './views/StudentEdit'
//import courseEdit from './views/EditCourse'
Vue.component('app-edit-student', studentEdit)
//vue.component('app-edit-course',courseEdit)
import store from './store'
import {ip} from './config/ip'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue)
Vue.config.productionTip = false;



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: 'login',
        
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        path: 'about',
        
      })
    } else {
      next()
    }
  } 
  
  else {
    next() // make sure to always call next()!
  }
})


new Vue({
  router,
  ip,
  store,
  render: h => h(App)
}).$mount('#app')



