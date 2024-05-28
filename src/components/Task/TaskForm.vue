<script setup lang="ts">
import { type Task, TASK_STATUSES, type TaskStatus } from "@/stores/tasks";

const task = defineModel<Task>();
</script>

<template>
  <form v-if="task" class="gap-6 flex flex-col">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-md font-bold">Task name</span>
      </div>
      <input
        class="input input-bordered w-full max-w-xs"
        :value="task.name"
        name="name"
        @change="
          task = {
            ...task,
            name: ($event.target as HTMLInputElement).value ?? '',
          }
        "
      />
    </label>

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-md font-bold">Task description</span>
      </div>
      <textarea
        class="textarea textarea-bordered"
        :value="task.description"
        name="description"
        @change="
          task = {
            ...task,
            description: ($event.target as HTMLInputElement).value ?? '',
          }
        "
      />
    </label>

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-md font-bold">Task status</span>
      </div>
      <select
        class="select w-full max-w-xs select-bordered"
        name="status"
        @change="
          task = {
            ...task,
            status: ($event.target as HTMLSelectElement).value as TaskStatus,
          }
        "
      >
        <option disabled value="">Please select status</option>
        <option
          v-for="status in TASK_STATUSES"
          :key="status"
          :value="status"
          :selected="task.status === status"
        >
          {{ status }}
        </option>
      </select>
    </label>
  </form>
</template>

<style scoped></style>
