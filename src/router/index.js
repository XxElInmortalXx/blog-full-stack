import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useFirebaseAuth } from "vuefire";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../App404View.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
    },
    {
      path: "/blog/:id",
      name: "blog-detail",
      component: () => import("../views/BlogDetailView.vue"),
    },
    {
      path: "/perfil",
      name: "profile",
      meta: { requiresAuth: true },
      component: () => import("../views/user/ProfileView.vue"),
    },
    {
      path: "/nuevo-post",
      name: "create-post",
      meta: { requiresAuth: true },
      component: () => import("../views/user/NewPostView.vue"),
    },
    {
      path: "/editar-post/:id",
      name: "edit-post",
      meta: { requiresAuth: true },
      component: () => import("../views/user/EditPostView.vue"),
    },
  ],
});

// guard to navigation (middleware route)
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    try {
      await authenticateUser();
      next();
      return;
    } catch (error) {
      next({ name: "home" });
      return;
    }
  }
  next();
});

// helper function to authenticate user
async function authenticateUser() {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

export default router;
