import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import NavBar from "./NavBar.vue";

describe("PageLayout.vue", () => {
  test("renders correctly", () => {
    const wrapper = mount(NavBar, {
      props: {
        title: "Test Title",
      },
    });

    expect(wrapper.text()).toContain("Test Title");
  });

  test("emits toggle-sidebar event when toggleSidebar method is called", async () => {
    const wrapper = mount(NavBar, {
      props: {
        title: "Test Title",
      },
    });

    await wrapper.find("#menu-button").trigger("click");
    expect(wrapper.emitted("toggle-sidebar")).toBeTruthy();
  });
});
