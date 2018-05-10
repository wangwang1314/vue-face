import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Survey from '@/components/home/survey'
import Home from '@/components/home/index'
import Structor from '@/components/structure/index'


import Man from '@/components/man/index'
import Person from '@/components/man/person'
import Good from '@/components/man/good'
import Bad from '@/components/man/bad'

import Accsurvey from '@/components/access/survey'
import Accrecord from '@/components/access/record'
import Acc from '@/components/access/index'

//开户
import OpenListindex from '@/components/openList/index'
import OpenList from '@/components/openList/OpenList'
import Places from '@/components/openList/places'
import Equipment from '@/components/openList/equipment'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",
      name:"login",
      component:Login
    },
    {
      path:"/openListindex",
      name:"OpenListindex",
      component:OpenListindex,
      children:[
        {
           path:'openlist',
           name:"openlist",
           component:OpenList
        },
        {
          path:"/places/:id/:cname",
          name:"Places",
          component:Places
        },
        {
          path:"/openListindex/equipment/:id/:pid",
          name:"Equipment",
          component:Equipment
        },
        {
          path:"/",
          redirect:"/openListindex/openlist"
        }
      ]
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
