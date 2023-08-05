<script setup lang="ts">
import EventCard from '../components/StudentCard.vue'
import type { StudentItem } from '@/type'
import { ref } from 'vue'
import type { Ref } from 'vue'
import StudentService from '@/services/StudentService'
 
const events: Ref<Array<StudentItem>> = ref([])
  StudentService.getStudents().then((response) => {
    events.value = response.data
  })
  
</script>

<template>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
  </main>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}</style>
<!-- <style scoped></style> -->