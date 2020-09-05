import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { title: '登录' }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
    meta: { title: '注册' }
  },
  {
    path: "/loginByEmail",
    name: "loginByEmail",
    component: () => import("../views/LoginByEmail.vue")
  }
  ,
  {
    path: "/menu",
    name: "Menu",
    component: () => import("../views/Menu.vue"),
    children: [
      {
        name: "UserInfoLog",
        path: "/userInfoLog",
        component: () => import("../views/menu/UserInfoLog.vue")
      },
      {
        name: "Product",
        path: "/productInfo",
        component: () => import("../views/menu/Product.vue")
      },
      {
        name: "Money",
        path: "/moneyLog",
        component: () => import("../views/menu/Money.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
