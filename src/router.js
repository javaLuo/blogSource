import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Live from "./views/contentPages/Live.vue";
import Works from "./views/contentPages/Works.vue";
import Article from "./views/contentPages/Article.vue";
import Detail from "./views/contentPages/Detail.vue";
import All from "./views/contentPages/All.vue";
import Class from "./views/contentPages/Class.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "all", // 所有动态
          name: "all",
          alias: "/",
          component: All
        },
        {
          path: "live", // 文章列表
          name: "live",
          component: Live
        },
        {
          path: "works", // 个人作品
          name: "works",
          component: Works
        },
        {
          path: "article", // 日志列表
          name: "article",
          component: Article
        },
        {
          path: "class", // 分类
          name: "class",
          component: Class
        },
        {
          path: "about", // 关于我
          name: "about",
          component: About
        },
        {
          path: "detail/:id", // 文章详情页
          name: "detail",
          component: Detail
        }
      ]
    }
  ]
});
