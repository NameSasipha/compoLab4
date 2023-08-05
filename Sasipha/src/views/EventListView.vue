
<template>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
      <div class="pagination">
      <RouterLink :to="{name: 'event-list', query: {page: page - 1}}" rel="prev" v-if="page != 1" id="page-prev">
        Prev Page
      </RouterLink>

      <RouterLink :to="{name: 'event-list', query: {page: page + 1}}" rel="next" v-if="hasNextPage" id="page-next">
        Next Page
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { computed, ref , watchEffect } from 'vue'
import type { Ref } from 'vue'
import eventService from '@/services/EventService'
import EventService from '@/services/EventService'
import type { Axios,AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'

const event: Ref<EventItem[]> =ref([])
const router = useRouter()
const events: Ref<Array<EventItem>> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
    page: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required:true
    }

})
 


// watchEffect(() =>{
//   EventService.getEvent(props.size, props.page).then((response: AxiosResponse<EventItem[]>) => {
//     events.value = response.data
//       totalEvent.value = response.headers['x-total-count']
//   })
// })

// NProgress.start()
EventService.getEvent(props.size, props.page).then((Response: AxiosResponse<EventItem[]>) => {
  event.value = Response.data
  totalEvent.value = Response.headers['x-total-count']
}).catch(() => {
  router.push({name: 'NetworkError'})
// }).finally(() => {
//   NProgress.done()
})

import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to, from , next) => {
  const toPage = Number(to.query.page)
  // NProgress.start()
  EventService.getEvent(props.size, toPage).then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
    next()
  }).catch(() => {
    next ({name: 'NetworkError'})
  // }).finally(() => {
  //   NProgress.done()
  })
})

const hasNextPage = computed(() => {
  //fist calculate the total page
  const totalPages = Math.ceil(totalEvent.value/props.size)
  return props.page.valueOf() < totalPages
})


  
</script>




<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}</style>

