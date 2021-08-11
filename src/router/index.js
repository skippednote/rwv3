import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import Nprogress from 'nprogress'
import EventService from '@/services/EventService'
import GStore from '@/store'

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
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404Resource',
              params: {
                resource: 'event',
              },
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  Nprogress.start()
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
