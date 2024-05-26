import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";

import TaskItem from "./TaskItem.vue";

test("test task item, not done", () => {
  const wrapper = mount(TaskItem, {
    props: {
      task: { id: 1, name: "Hello World", status: "To Do", description: "" },
    },
  });

  expect(wrapper.text()).toContain("Hello World");
  expect(wrapper.text()).toContain("To Do");

  wrapper.trigger("click");

  expect(wrapper.emitted("click")).toBeTruthy();
});
