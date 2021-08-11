import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => {
      console.log(route)
      return { page: parseInt(route.query.page) || 1 }
    },
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    props: true,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ],
  },

  {
    path: '/about-us',
    name: 'About',
    component: About,
    // alias: '/about',
  },
  {
    path: '/about',
    redirect: { name: 'About' },
  },

  {
    // path: '/event/:id',
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return {
        path: '/events/' + to.params.afterEvent,
      }
    },
    // redirect: (to) => {
    //   return {
    //     name: 'EventDetails',
    //     params: { id: to.params.id },
    //   }
    // },
    // children: [
    //   {
    //     path: 'register',
    //     redirect: () => ({
    //       name: 'EventRegister',
    //     }),
    //   },
    //   {
    //     path: 'edit',
    //     redirect: () => ({
    //       name: 'EventEdit',
    //     }),
    //   },
    //   {
    //     path: '',
    //     redirect: () => ({
    //       name: 'EventDetails',
    //     }),
    //   },
    // ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
