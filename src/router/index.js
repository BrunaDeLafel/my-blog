import Vue from 'vue'
import Router from 'vue-router'
import edit from '@/components/editarticle'
import list from '@/components/articlelist'
import article from '@/components/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    },
    {
      path:'/article',
      name:'article',
      component: article
    }
  ]
})
