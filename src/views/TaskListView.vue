<script setup lang="ts">
import TaskItem from "@/components/Task/TaskItem.vue";
import { useTaskStore } from "@/stores/tasks";

const taskStore = useTaskStore();

function addNewEmptyTask() {
  taskStore.addTask({
    name: "Some task",
    status: "To Do",
    description: "Lorem ipsum",
  });
}
</script>
<template>
  <div v-if="taskStore.tasks.length">
    <button
      class="btn btn-primary"
      data-test-id="task-add"
      @click="addNewEmptyTask"
    >
      Add Task
    </button>
    <ul class="list-none space-y-2" data-test-id="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id">
        <RouterLink :to="`task/${task.id}`">
          <TaskItem :task="task" />
        </RouterLink>
      </li>
    </ul>
  </div>

  <div v-else class="text-center" data-test-id="task-empty">
    <h2 class="text-2xl font-bold">No tasks found</h2>
    <button
      class="btn btn-primary"
      data-test-id="task-add"
      @click="addNewEmptyTask"
    >
      Add Task
    </button>
  </div>
</template>
