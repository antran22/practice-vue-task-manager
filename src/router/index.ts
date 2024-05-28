import { createRouter, createWebHistory } from "vue-router";

import TaskDetailView from "@/views/TaskDetailView.vue";
import TaskListView from "@/views/TaskListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "tasks",
      component: TaskListView,
    },
    {
      path: "/task/:id",
      name: "task-detail",
      component: TaskDetailView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
