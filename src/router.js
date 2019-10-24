import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue';
import AddStudent from './views/AddStudent.vue';
import CourseRegistration from './views/courseRegistration';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';
import CourseDetail from './views/CourseDetail';
import StudentDetail from './views/StudentDetail';
import AddCourse from './views/AddCourse';
import Session from './views/Session';
import SesssionDetails from './views/SessionDetail';
import Sessionform from './views/showsession';
import grademanagement from './views/gradeManagement';
import sessionname from './views/showsession';
import Newlogin from './auth/newlogin';
import studentprofile from './components/StudentProfile'
import navbar from './components/Navbar'
import aca from './academic/academic'
import finance from './finance/finance'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },

    {
      path:'/addstudent',
      name:'addstudent',
      component:AddStudent,
      // meta:{
      //   requiresAuth:true
      // }
    },
    {
      path:'/addcourse',
      name:'addcourse',
      component:AddCourse,
      // meta:{
      //   requiresAuth:true
      // }
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
        path:'/logout',
        name:'logout',
        component:Logout

    },
    {
      path:'/register',
      name:'register',
      component:Register,
      // meta:{
      //   requiresAuth:true
      // }
    },
    {
      path:'/coursedetail',
      name:'coursedetail',
      component:CourseDetail,
      // meta:{
      //   requiresAuth:true
      // }
    },
    {path:'/studentDetail',
    name:'studentdetail',
    component:StudentDetail,
    // meta:{
    //   requiresAuth:true
    // }
     },
     {
       path:'/session',
       name:'session',
       component:Session,
      //  meta:{
      //   requiresAuth:true
      // }
     },
     {
       path:'/sessiondetail',
       name:'Details',
       component:SesssionDetails,
      //  meta:{
      //   requiresAuth:true
      // }
     },
     {
       path:'/sessionname',
       name:'sessionform',
       component:Sessionform,
      //  meta:{
      //   requiresAuth:true
      // }
     },
     {
       path:'/courseRegistration',
       name:'courseRegistration',
       component:CourseRegistration,
      //  meta:{
      //   requiresVisitor:true
      // }
     },
     {
       path:'/gradeManagement',
       name:'grademanagement',
       component:grademanagement,
      //  meta:{
      //   requiresAuth:true
      // }
     },
     {
       path:'/sessionname',
       name:'sessionname',
       component:sessionname,
      //  meta:{
      //   requiresAuth:true
      // }

     },
     {
       path:'/loggin',
       name:'newlogin',
       component:Newlogin
     },
     {
       path:'/studentprofile',
       name:'studentProfile',
       component:studentprofile
     },
     {
      path:'/adminprofile',
      name:'navbar',
      component:navbar
    },
    {
      path:'/academic',
      name:'aca',
      component:aca
    },
    {
      path:'/finance',
      name:'finance',
      component:finance
    }



  ]
})
