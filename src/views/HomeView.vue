<script setup lang="ts">
import TaskItem from "@/components/TaskItem/TaskItem.vue";
</script>
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

<template>
  <ul class="list-none space-y-2">
    <TaskItem
      v-for="i in 10"
      :key="i"
      :task="{
        id: i,
        name: `Task ${i}`,
        status: 'To Do',
        description: 'This is a description',
      }"
      status="In Progress"
    />
  </ul>
</template>
