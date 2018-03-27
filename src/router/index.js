import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Survey from '@/components/home/survey'
import Record from '@/components/home/record'
import Home from '@/components/home/index'

import Man from '@/components/man/index'
import Person from '@/components/man/person'
import Good from '@/components/man/good'
import Bad from '@/components/man/bad'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",
      name:"login",
      component:Login
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
    }
  ]
})
