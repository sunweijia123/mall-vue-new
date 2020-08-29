import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import sunweijia from '@/components/sunweijia'
import success from '@/components/success'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/login',
      name: 'login',
      component: login
    },
    {
    	path: '/success',
      name: 'success',
      component: success
    },
    {
    	path: '/sunweijia',
      name: 'sunweijia',
      component: sunweijia
    }
  ]
})
