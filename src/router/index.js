import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Survey from '@/components/home/survey'
import Record from '@/components/home/record'
import Home from '@/components/home/index'
import Structor from '@/components/structure/index'
import OpenList from '@/components/openList/OpenList'
import Places from '@/components/openList/places'
import Equipment from '@/components/openList/equipment'

import Man from '@/components/man/index'
import Person from '@/components/man/person'
import Good from '@/components/man/good'
import Bad from '@/components/man/bad'

import Accsurvey from '@/components/access/survey'
import Accrecord from '@/components/access/record'
import Acc from '@/components/access/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",
      name:"login",
      component:Login
    },
      {
       path:'/openlist',
       name:"openlist",
       component:OpenList

    },
    {
      path:"/Places",
      name:"Places",
      component:Places
    },
    {
      path:"/Equipment",
      name:"Equipment",
      component:Equipment
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path:"survey",
          name:"survey",
          component:Survey
        },
        {
          path:"record",
          name:"record",
          component:Record
        },
        {
          path:"",
          redirect:"/home/survey"
        }
      ]
    },
     {
      path: '/acc',
      name: 'acc',
      component: Acc,
      children:[
        {
          path:"accsurvey",
          name:"accsurvey",
          component:Accsurvey
        },
        {
          path:"accrecord",
          name:"accrecord",
          component:Accrecord
        },
        {
          path:"",
          redirect:"/acc/accsurvey"
        }
      ]
    },
     {
      path: '/man',
      name: 'man',
      component: Man,
      children:[
        {
          path:"person",
          name:"person",
          component:Person
        },
        {
          path:"good",
          name:"good",
          component:Good
        },
         {
          path:"bad",
          name:"bad",
          component:Bad
        },
        {
          path:"",
          redirect:"/man/person"
        }
      ]
    },
    {
      path:"*",
      redirect:"/home"
    }
  ]
})
