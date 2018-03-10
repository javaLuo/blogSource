import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Live from "./views/contentPages/Live.vue";
import Works from "./views/contentPages/Works.vue";
import Article from "./views/contentPages/Article.vue";
import Detail from "./views/contentPages/Detail.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "live", // 动态
          name: "live",
          alias: "/",
          component: Live
        },
        {
          path: "works", // 作品列表
          name: "works",
          component: Works
        },
        {
          path: "article", // 文章列表
          name: "article",
          component: Article
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
