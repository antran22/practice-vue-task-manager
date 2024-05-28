import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const TASK_STATUSES = ["To Do", "In Progress", "Done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPayload = {
  name: string;
  status: TaskStatus;
  description: string;
};
export type Task = {
  id: number;
} & TaskPayload;

export const useTaskStore = defineStore(
  "tasks_store",
  () => {
    const tasks = ref<Task[]>([]);
    const counter = ref(0);

    function addTask(taskDetail: TaskPayload): Task {
      counter.value = counter.value + 1;
      const result = { ...taskDetail, id: counter.value };
      tasks.value = [...tasks.value, result];
      return result;
    }

    function removeTask(id: number): Task | null {
      const task = tasks.value.find((task) => task.id === id);
      if (!task) {
        return null;
      }
      tasks.value = tasks.value.filter((task) => task.id !== id);
      return task;
    }

    function updateTask(id: number, newTaskDetail: TaskPayload): Task | null {
      const task = tasks.value.find((task) => task.id === id);
      if (!task) {
        return null;
      }
      const newTask = { ...task, ...newTaskDetail };
      tasks.value = tasks.value.map((task) =>
        task.id === id ? newTask : task,
      );
      return newTask;
    }

    function getTask(id: number): Task | null {
      const task = tasks.value.find((task) => task.id === id);
      return task ?? null;
    }

    const getTaskRef = computed(() => {
      const taskList = tasks.value;
      return (id: number) => {
        return taskList.find((task) => task.id === id);
      };
    });

    const firstTask = computed(() => {
      return tasks.value[0];
    });

    return {
      tasks,
      counter,
      addTask,
      removeTask,
      updateTask,
      getTask,
      getTaskRef,
      firstTask,
    };
  },
  { persist: true },
);
