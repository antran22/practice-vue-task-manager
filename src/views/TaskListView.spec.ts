import { createTestingPinia } from "@pinia/testing";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect } from "vitest";

import TaskListView from "./TaskListView.vue";
import TaskItem from "../components/Task/TaskItem.vue";
import { useTaskStore } from "../stores/tasks";

describe("TaskListView.vue empty state", () => {
  test("empty task", () => {
    const wrapper = mount(TaskListView, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("No tasks found");
    expect(wrapper.find("div[data-test-id='task-empty']").exists()).toBe(true);

    expect(wrapper.find("ul[data-test-id='task-list']").exists()).toBe(false);
  });
});

describe("TaskListView.vue with tasks", () => {
  test("with one task", async () => {
    const pinia = createTestingPinia();
    const taskStore = useTaskStore(pinia);
    taskStore.tasks = [
      {
        id: 1,
        name: "Test Task",
        status: "To Do",
        description: "Test Description",
      },
    ];

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).not.toContain("No tasks found");
    expect(wrapper.find("div[data-test-id='task-empty']").exists()).toBe(false);

    expect(wrapper.find("ul[data-test-id='task-list']").exists()).toBe(true);
    expect(wrapper.findAllComponents(TaskItem)).toHaveLength(1);
  });

  test("with ten tasks", async () => {
    const pinia = createTestingPinia();
    const taskStore = useTaskStore(pinia);
    taskStore.tasks = [...Array(10).keys()].map((_item, idx) => ({
      id: idx + 1,
      name: "Test Task",
      status: "To Do",
      description: "Test Description",
    }));

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find("ul[data-test-id='task-list']").exists()).toBe(true);
    expect(wrapper.findAllComponents(TaskItem)).toHaveLength(10);
  });

  test("with adding tasks", async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const taskStore = useTaskStore(pinia);
    const wrapper = mount(TaskListView, {
      global: {
        plugins: [pinia],
      },
    });

    const btn = wrapper.find<HTMLButtonElement>("button");
    await btn.trigger("click");
    expect(taskStore.addTask).toHaveBeenCalledOnce();
    expect(taskStore.addTask).toHaveBeenCalledOnce();
  });
});
