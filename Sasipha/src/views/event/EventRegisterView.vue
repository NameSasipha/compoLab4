<script setup lang="ts">
// import {ref} from 'vue'
import {type EventItem} from '@/type'
// import EventService from '@/services/EventService'
// const event = ref<EventItem | null>(null)
import type { PropType } from 'vue';
// const props = defineProps({
//     id: String
// })
defineProps({
    event: {
        type : Object as PropType<EventItem>,
        require : true
    }
})

// EventService.getEventByID(Number(props.id))
// .then((response)=> {
//     event.value = response.data
// })
//     .catch((error) => {
//         console.log(error)
//     })

</script>
<!-- 
<template>
    <div v-if ="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
        <router-link :to="{name: 'event-detail' , params: {id}}" > Details </router-link> 
        |
        <router-link :to="{name: 'event-register' , params: {id}}" > Register </router-link> 
        |
        <router-link :to="{name: 'event-edit' , params: {id}}" > Edit </router-link> 

    </div> -->
    <template>
    <p>Register from  here</p>
    <!-- </div> -->
</template>