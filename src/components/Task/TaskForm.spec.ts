import { mount } from "@vue/test-utils";
import { describe, expect } from "vitest";

import TaskForm from "./TaskForm.vue";

import type { Task } from "@/stores/tasks";

describe("TaskForm render", () => {
  test("render correctly when passed in a Task", () => {
    const task: Task = {
      id: 1,
      name: "Test Task",
      status: "To Do",
      description: "Test Description",
    };
    const wrapper = mount(TaskForm, {
      props: {
        modelValue: task,
      },
    });
    const nameInput = wrapper.find<HTMLInputElement>("[name='name']");
    expect(nameInput.element.value).toBe(task.name);

    const descriptionInput = wrapper.find<HTMLInputElement>(
      "[name='description']",
    );
    expect(descriptionInput.element.value).toBe(task.description);

    const status = wrapper.find<HTMLSelectElement>("[name='status']");
    expect(status.element.value).toBe(task.status);
  });
});

describe("TaskForm editing", () => {});
