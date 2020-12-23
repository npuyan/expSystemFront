import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line no-unused-vars
import HelloWorld from '../views/HelloWorld'
import login from '../views/login'
import Home from '../views/Home'
import lay from '../views/lay'
import novnc from '../views/novnc'

Vue.use(Router)
export default new Router({
  mode: 'history',
  // base:'/myvueproject/'
  routes: [
    {
      path: '/',
      name: login,
      component: login
    }, {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/lay',
      name: 'lay',
      component: lay,
      children: [
        {
          path: 'novnc',
          name: 'novnc',
          component: novnc
        }
      ]
    }, {
      path: '/novnc',
      name: 'novnc',
      component: novnc
    }
  ]
})
