<script setup lang="ts">
import type { Task } from "@/stores/tasks";

type Props = {
  task: Task;
};
defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-row shadow-md p-5 gap-4 rounded-box bg-base-100 border hover:bg-base-200 transition"
  >
    <div class="text-2xl">{{ task.name }}</div>
    <div class="text-sm badge badge-secondary">{{ task.status }}</div>
  </div>
</template>

<style scoped></style>
