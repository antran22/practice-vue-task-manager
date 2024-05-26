<script setup lang="ts">
import { ref } from "vue";

import NavBar from "@/components/PageLayout/NavBar.vue";
import SideBar from "@/components/PageLayout/SideBar.vue";
const isDrawerOpen = ref(false);
</script>
;;;;;;;;;;

<template>
  <div class="drawer drawer-end">
    <input
      id="app-drawer"
      ref="$toggleCheckbox"
      type="checkbox"
      class="drawer-toggle"
      :checked="isDrawerOpen"
    />
    <div class="drawer-content flex flex-col">
      <NavBar
        title="Task Manager"
        @toggle-sidebar="isDrawerOpen = !isDrawerOpen"
      />
      <main class="container mx-auto mt-2 md:mt-5">
        <slot></slot>
      </main>
    </div>
    <div class="drawer-side">
      <div class="drawer-overlay" @click="isDrawerOpen = false"></div>

      <ul class="menu p-4 w-80 min-h-full bg-base-200">
        <SideBar />
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
