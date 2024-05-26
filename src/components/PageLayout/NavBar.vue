<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineProps<{
  title: string;
}>();

defineEmits<{
  (e: "toggle-sidebar"): void;
}>();
</script>

<template>
  <header class="navbar flex flex-row border-b">
    <div class="flex-1">
      <button class="btn btn-ghost text-2xl">
        <img alt="App logo" src="@/assets/logo.svg" width="24" height="24" />
        <span>{{ title }}</span>
      </button>
    </div>

    <button
      id="menu-button"
      class="btn btn-square btn-ghost btn-sm"
      @click="$emit('toggle-sidebar')"
    >
      <Icon icon="carbon:menu" />
    </button>
  </header>
</template>
