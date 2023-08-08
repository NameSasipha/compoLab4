import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import CategoryView from '../views/CategoryViwe.vue'
import SudentView from '../views/StudentView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutViewVue from '@/views/event/EventLayoutView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NotFoundview from '@/views/NotFoundView.vue'
import NProgress  from 'nprogress'
import EventService from '@/services/EventService'
// import { error } from 'console'
import { useEventStore} from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1')  }),

      beforeEnter: (to, _, next) => {
        if (
          !to.query?.page ||
          parseInt(to.query?.page as string) < 1 ||
          isNaN(parseInt(to.query?.page as string))
        ) {
          next({ name: 'event-list', query: { page: 1 } })
        } else {
          next()
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
    path: '/student',
    name: 'student',
    component: SudentView
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutViewVue,
      props: true,
      beforeEnter: (to) => {
        const id : number =  parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEventByID(id)
        .then((Response) => {
          //need to set up the data for the cmponent
          eventStore.setEvent(Response.data)
        }).catch((error) => {
          if (error.Response && error.Response.status === 404) {
            return {
              name : '404-resource',
              params: {resource: 'event'}
            }
          }else {
            return {name : 'network-error'}
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail',
          props: true,
          component: EventDetailView,
        },
        {
          path: 'edit',
          name: 'event-edit',
          props: true,
          component: EventEditView 
        },
        {
          path: 'register',
          name: 'event-register',
          props: true,
          component: EventRegisterView 

        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundview,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundview
    },{
      path: '/netwrok-error',
      name: 'network-error',
      component: NetworkErrorView
    }   

    
  ],
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {top : 0}
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
