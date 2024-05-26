import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";

import HeaderComponent from "./PageLayout.vue";

describe("PageLayout.vue", () => {
  test("renders correctly", () => {
    const wrapper = mount(HeaderComponent, {});

    expect(wrapper.text()).toContain("Task Manager");
    expect(wrapper.findComponent(".drawer").exists()).toBe(true);
    expect(wrapper.find(".drawer-side").exists()).toBe(true);
    expect(wrapper.find("main").exists()).toBe(true);
  });

  test("toggle correctly", async () => {
    const wrapper = mount(HeaderComponent, {});

    const menuButton = wrapper.find("#menu-button");
    const drawerState = wrapper.find<HTMLInputElement>("#app-drawer");

    expect(drawerState.element.checked).toBe(false);
    await menuButton.trigger("click");

    expect(drawerState.element.checked).toBe(true);

    await menuButton.trigger("click");
    expect(drawerState.element.checked).toBe(false);
  });
});
