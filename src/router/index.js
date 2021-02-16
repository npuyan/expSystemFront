import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line no-unused-vars
import HelloWorld from '../views/HelloWorld'
import login from '../views/login'
import Home from '../views/Home'
import lay from '../views/lay'
import novnc from '../views/novnc'
import logup from '../views/logup'
import adminIndex from '../views/admin/adminIndex'
import chooseCourseManage from '../views/admin/chooseCourseManage'
import clusterManage from '../views/admin/clusterManage'
import courseManage from '../views/admin/courseManage'
import envManage from '../views/admin/envManage'
import imageManage from '../views/admin/imageManage'
import labManage from '../views/admin/labManage'
import studentManage from '../views/admin/studentManage'
import teacherIndex from '../views/teacher/teacherIndex'
import teacherManage from '../views/admin/teacherManage'
import course from '../views/course'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  // base:'/myvueproject/'
  routes: [
    {
      path: '/',
      name: login,
      component: login
    },
    {
      path: '/logup',
      name: logup,
      component: logup
    },
    {
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
    }, {
      path: '/adminindex',
      name: 'adminindex',
      component: adminIndex,
      children: [
        {
          // 默认打开跳到集群管理
          path: '/',
          redirect: '/clusterManage'
        }, {
          path: '/chooseCourseManage',
          name: chooseCourseManage,
          component: chooseCourseManage
        }, {
          path: '/clusterManage',
          name: clusterManage,
          component: clusterManage
        }, {
          path: '/courseManage',
          name: courseManage,
          component: courseManage
        }, {
          path: '/envManage',
          name: envManage,
          component: envManage
        }, {
          path: '/imageManage',
          name: imageManage,
          component: imageManage
        }, {
          path: '/labManage',
          name: labManage,
          component: labManage
        }, {
          path: '/studentManage',
          name: studentManage,
          component: studentManage
        }, {
          path: '/teacherManage',
          name: teacherManage,
          component: teacherManage
        }
      ]
    }, {
      path: '/course',
      name: 'course',
      component: course
    }
  ]
})
