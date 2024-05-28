import { createPinia, setActivePinia } from "pinia";
import { describe } from "vitest";

import type { TaskPayload } from "./tasks";
import { useTaskStore } from "./tasks";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("Task Create", () => {
  it("create new task", () => {
    const taskStore = useTaskStore();
    expect(taskStore.tasks.length).toBe(0);

    const taskPayload: TaskPayload = {
      name: "Test Task",
      status: "To Do",
      description: "Test Description",
    };

    const newTask = taskStore.addTask(taskPayload);

    expect(newTask).toBeTruthy();
    expect(taskStore.tasks.length).toBe(1);
    expect(newTask.id).toBe(1);

    expect(newTask).toMatchObject(taskPayload);
  });

  it("has auto incrementing id", () => {
    const taskStore = useTaskStore();

    const task1 = taskStore.addTask({
      name: "Test Task 1",
      status: "To Do",
      description: "Test Description",
    });
    const task2 = taskStore.addTask({
      name: "Test Task 2",
      status: "To Do",
      description: "Test Description",
    });

    expect(task1.id).toBe(1);
    expect(task2.id).toBe(2);
  });
});

describe("Querying Tasks", () => {
  it("get existing task", () => {
    const taskStore = useTaskStore();

    const taskPayload: TaskPayload = {
      name: "Test Task",
      status: "To Do",
      description: "Test Description",
    };

    const newTask = taskStore.addTask(taskPayload);

    const queryTask = taskStore.getTask(newTask.id);

    expect(queryTask).toEqual(newTask);
  });

  it("return null when querying non existing task", () => {
    const taskStore = useTaskStore();

    const queryTask = taskStore.getTask(10);

    expect(queryTask).toBeNull();
  });
});

describe("Task Removal", () => {
  it("remove task", () => {
    const taskStore = useTaskStore();
    expect(taskStore.tasks.length).toBe(0);

    const task = taskStore.addTask({
      name: "Test Task",
      status: "To Do",
      description: "Test Description",
    });

    expect(task).toBeTruthy();
    expect(taskStore.tasks.length).toBe(1);

    const deletedTask = taskStore.removeTask(task.id);
    expect(deletedTask).toBeTruthy();
    expect(deletedTask).toEqual(task);
    expect(taskStore.tasks.length).toBe(0);
  });

  it("cannot remove non existing task", () => {
    const taskStore = useTaskStore();
    expect(taskStore.tasks.length).toBe(0);

    const deletedTask = taskStore.removeTask(10);

    expect(deletedTask).toBeNull();
  });
});

describe("Task Updating", () => {
  it("update task", () => {
    const taskStore = useTaskStore();
    expect(taskStore.tasks.length).toBe(0);

    const initialTaskPayload: TaskPayload = {
      name: "Test Task",
      status: "To Do",
      description: "Test Description",
    };

    const task = taskStore.addTask(initialTaskPayload);
    expect(task.id).toBe(1);
    expect(task).toMatchObject(initialTaskPayload);

    const taskUpdatePayload: TaskPayload = {
      name: "Updated Task",
      status: "In Progress",
      description: "Updated Description",
    };

    const updatedTask = taskStore.updateTask(task.id, taskUpdatePayload);
    expect(updatedTask).toMatchObject(taskUpdatePayload);
    expect(updatedTask).toBeTruthy();
    expect(taskStore.tasks).toContainEqual(updatedTask);
  });
});
