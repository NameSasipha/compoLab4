<script setup lang="ts">
// import {ref} from 'vue'
import {type EventItem} from '@/type'
import type { PropType } from 'vue';
// import EventService from '@/services/EventService'
// const event = ref<EventItem | null>(null)
defineProps({
    event: {
        type: Object as PropType<EventItem>,
            require : true
    }
})
// const props = defineProps({
//     id: String
// })

// EventService.getEventByID(Number(props.id))
// .then((response)=> {
//     event.value = response.data
// })
//     .catch((error) => {
//         console.log(error)
//     })
</script>

<!-- <template>
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
    <p>Edit the event here</p>
    <!-- </div> -->
</template>