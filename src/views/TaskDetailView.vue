<script setup lang="ts">
import debounce from "lodash-es/debounce";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";

import TaskForm from "@/components/Task/TaskForm.vue";
import { type Task, useTaskStore } from "@/stores/tasks";

const route = useRoute();
const id = route.params["id"];
const taskStore = useTaskStore();

const { getTaskRef } = storeToRefs(taskStore);

const task = computed(() => getTaskRef.value(parseInt(id as string)));

const handleUpdate = debounce((task: Task) => {
  taskStore.updateTask(task.id, task);
});
</script>

<template>
  <div v-if="task">
    <h2 class="text-2xl font-bold">{{ task.name }}</h2>
    <TaskForm :model-value="task" @update:model-value="handleUpdate" />
  </div>
  <div v-else>
    <h2>Task not found</h2>
  </div>
</template>

<style scoped></style>
