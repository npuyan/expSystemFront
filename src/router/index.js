import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line no-unused-vars
import login from '../views/login'
import logup from '../views/logup'
import lay from '../views/student/lay'
import novnc from '../views/student/novnc'
import course from '../views/student/course'
import studentCourseDetails from '../views/student/courseDetails'
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
import myStudent from '../views/teacher/myStudent'
import myCourse from '../views/teacher/myCourse'
import myLab from '../views/teacher/myLab'
import teacherCourseDetails from '../views/teacher/courseDetails'
import teacherCourseBasic from '../views/teacher/courseBasic'
import teacherLabDetails from '../views/teacher/labDetails'
import pendingApplications from '../views/teacher/pendingApplications'
import teacherStudentCourseDetails from '../views/student/courseDetails'
import guestCourseDetails from '../views/student/courseDetails'

import envVnc from '../views/teacher/envVnc'
import courseGrade from '../views/teacher/courseGrade'
import mainPage from '../views/mainPage'
import defaultPage from '../views/defaultPage'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: mainPage,
      component: mainPage
    },
    {
      path: '/login',
      name: login,
      component: login
    },
    {
      path: '/logup',
      name: logup,
      component: logup
    }, 
    {
      path: '/lay',
      name: 'lay',
      component: lay,
      beforeEnter: (to, from, next) => {
        console.log(from)
        console.log(to)
        if(from.path === '/') next({path: '/'})
        else next()
      },
      children: [
        {
          path: '/lay/novnc',
          name: 'novnc',
          component: novnc
        },
        {
          path: '/studentCourseDetails',
          name: studentCourseDetails,
          component: studentCourseDetails
    
        }, 
        {
          path: '/course',
          name: 'course',
          component: course
        }, {
          path: '/guestCourseDetails',
          name: 'guestCourseDetails',
          component: guestCourseDetails
        }
      ]
    },
     {
      path: '/novnc',
      name: 'novnc',
      component: novnc
    }, {
      path: '/adminindex',
      name: 'adminindex',
      component: adminIndex,
      beforeEnter: (to, from, next) => {
        console.log(from)
        console.log(to)
        if(from.path === '/') next({path: '/'})
        else next()
      },
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
      path: '/teacherIndex',
      name: teacherIndex,
      component: teacherIndex,
      beforeEnter: (to, from, next) => {
        console.log(from)
        console.log(to)
        if(from.path === '/') next({path: '/'})
        else next()
      },
      children: [
        {
          // 默认打开跳到课程管理
          path: '/',
          redirect: '/myCourse'
        }, {
          path: '/myCourse',
          name: myCourse,
          component: myCourse,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          path: '/myStudent',
          name: myStudent,
          component: myStudent,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          path: '/myLab',
          name: myLab,
          component: myLab,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }, {
          path: '/teacherCourseDetails',
          name: teacherCourseDetails,
          component: teacherCourseDetails,
          meta: {
            keepAlive: true // 需要缓存
          }
        }, {
          path: '/teacherLabDetails',
          name: teacherLabDetails,
          component: teacherLabDetails,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }, {
          path: '/teacherCourseBasic',
          name: teacherCourseBasic,
          component: teacherCourseBasic,
          meta: {
            keepAlive: true // 需要缓存
          }
        }, {
          path: '/envVnc',
          name: envVnc,
          component: envVnc,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }, {
          path: '/pendingApplications',
          name: pendingApplications,
          component: pendingApplications,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }, {
          path: '/courseGrade',
          name: courseGrade,
          component: courseGrade,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/teacherStudentCourseDetails',
          name: teacherStudentCourseDetails,
          component: teacherStudentCourseDetails
        }

      ],

    }
  ]
})

