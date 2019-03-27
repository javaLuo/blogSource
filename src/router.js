import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import All from "./views/contentPages/All.vue";

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
          component: () =>
            import(/* webpackChunkName: "live" */ "./views/contentPages/Live.vue")
        },
        {
          path: "works", // 个人作品
          name: "works",
          component: () =>
            import(/* webpackChunkName: "works" */ "./views/contentPages/Works.vue")
        },
        {
          path: "article", // 日志列表
          name: "article",
          component: () =>
            import(/* webpackChunkName: "article" */ "./views/contentPages/Article.vue")
        },
        {
          path: "tags", // tag分类
          name: "class",
          component: () =>
            import(/* webpackChunkName: "tags" */ "./views/contentPages/Class.vue")
        },
        {
          path: "detail/:id", // 文章详情页
          name: "detail",
          component: () =>
            import(/* webpackChunkName: "detail" */ "./views/contentPages/Detail.vue")
        },
        {
          path: "about", // 关于我
          name: "about",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
          path: "photo", // 相册
          name: "photo",
          component: () =>
            import(/* webpackChunkName: "photo" */ "./views/Photo.vue")
        }
      ]
    }
  ]
});
