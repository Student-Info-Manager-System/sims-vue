import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/common/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/common/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/common/Home.vue')
  },
  {
    path: '/editPwd',
    name: 'EditPwd',
    component: () => import('../views/common/EditPwd.vue')
  },
  {
    path: '/editUserInfo',
    name: 'EditUserInfo',
    component: () => import('../views/common/EditUserInfo.vue')
  },
  {
    path: '/editGrade/:id/:name',
    name: 'EditGrade',
    component: () => import('../views/admin/EditGrade.vue')
  },
  {
    path: '/editCourse/:id/:name',
    name: 'EditCourse',
    component: () => import('../views/admin/EditCourse.vue')
  },
  {
    path: '/editStudent/:number',
    name: 'EditStudent',
    component: () => import('../views/admin/EditStudent.vue')
  },
  {
    path: '/adminInfo',
    name: 'AdminInfo',
    component: () => import('../views/admin/AdminInfo.vue')
  },
  {
    path: '/gradeManager',
    name: 'GradeManager',
    component: () => import('../views/admin/GradeManager.vue')
  },
  {
    path: '/studentManager',
    name: 'StudentManager',
    component: () => import('../views/admin/StudentManager.vue')
  },
  {
    path: '/courseManager',
    name: 'CourseManager',
    component: () => import('../views/admin/CourseManager.vue')
  },
  {
    path: '/achievementManager',
    name: 'AchievementManager',
    component: () => import('../views/admin/AchievementManager.vue')
  },
  {
    path: '/addStudent',
    name: 'AddStudent',
    component: () => import('../views/admin/AddStudent.vue')
  },
  {
    path: '/addGrade',
    name: 'AddGrade',
    component: () => import('../views/admin/AddGrade.vue')
  },
  {
    path: '/addCourse',
    name: 'AddCourse',
    component: () => import('../views/admin/AddCourse.vue')
  },
  {
    path: '/addTimetable',
    name: 'AddTimetable',
    component: () => import('../views/admin/AddTimetable.vue')
  },
  {
    path: '/timeTable',
    name: 'TimeTable',
    component: () => import('../views/common/TimeTable.vue')
  },

  {
    path: '/studentInfo',
    name: 'StudentInfo',
    component: () => import('../views/student/StudentInfo.vue')
  },
  {
    path: '/myGrade',
    name: 'MyGrade',
    component: () => import('../views/student/MyGrade.vue')
  },
  {
    path: '/infoSearch',
    name: 'InfoSearch',
    component: () => import('../views/student/InfoSearch.vue')
  },{
    path: '/studentTable',
    name: 'StudentTable',
    component: () => import('../views/student/StudentTable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
