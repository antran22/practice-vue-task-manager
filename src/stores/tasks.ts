import { defineStore } from "pinia";
import { ref } from "vue";

export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPayload = {
  name: string;
  status: TaskStatus;
  description: string;
};
export type Task = {
  id: number;
} & TaskPayload;

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const _counter = ref(0);

  function addTask(taskDetail: TaskPayload): Task {
    _counter.value = _counter.value + 1;
    const result = { ...taskDetail, id: _counter.value };
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
    tasks.value = tasks.value.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
  };
});
