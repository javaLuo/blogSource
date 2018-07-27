<template>
    <div class="page-detail" :v-loading="true">
        <div class="bread">
            <i class="el-icon-location"></i>
            <Breadcrumb>
                <BreadcrumbItem to="/all">博客列表</BreadcrumbItem>
                <BreadcrumbItem :to="breadType.url">{{ breadType.title }}</BreadcrumbItem>
                <BreadcrumbItem>{{ blogConfig.title }}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="info">
            <div class="title" >{{ blogConfig.title }}</div>
            <div class="date">{{ blogConfig.date }}</div>
        </div>
        <div v-if="!sourceData" class="loading-box">
            <img :src="ImgLoading" />
            <div>正在从开源世界获取…</div>
        </div>
        <div ref="theBody" v-html="htmlData" class="the-body markdown-body editormd-html-preview"></div>
        <div class="the-end">--<span>End</span>--</div>
        <div id="gitment-box" class="gitment-box"></div>
    </div>
</template>

<script>
/** 文章的详情页 **/
import { mapState, mapGetters } from "vuex";

import "gitment/style/default.css";
import { masterName, issueName, client_id, client_secret } from "../../config";
import ShowDown from "showdown";
import loadLanguages from "prismjs/components/index";
import Gitment from "gitment";
import ImgLoading from "../../assets/loading.gif";
import "prismjs/themes/prism-dark.css";

import { Button, Breadcrumb, BreadcrumbItem } from "element-ui";
export default {
  name: "live",
  data: function() {
    return {
      sourceData: null,
      ImgLoading
    };
  },
  components: {
    Button,
    Breadcrumb,
    BreadcrumbItem
  },
  mounted() {
    // console.log("router:", this.$route.params.id);
    this.getData(this.$route.params.id);

    this.initGitMent();
  },
  computed: {
    /** 原始数据转html代码 **/
    htmlData() {
      if (!this.sourceData) {
        return null;
      }

      loadLanguages(["markdown"]);
      // console.log("生成的html:", html);
      //  return html;

      const converter = new ShowDown.Converter();
      return converter.makeHtml(this.sourceData);
    },
    ...mapState({
      blogCache(state) {
        return state.app.blogs.find(
          item => item.name === this.$route.params.id
        );
      },
      /** 获取当前文章的配置信息 **/
      blogConfig(state) {
        const id = this.$route.params.id;
        if (!id || !state.app.blogConfig) {
          return {};
        }
        const b = state.app.blogConfig.d;
        // console.log('是什么啊：',b.find(item => item.gitname === id) );
        return b.find(item => item.gitname === id) || { title: id };
      },
      breadType() {
        switch (this.blogConfig.type) {
          case 1:
            return { title: "文章列表", url: "/live" };
          case 2:
            return { title: "个人作品", url: "/works" };
          case 3:
            return { title: "日志列表", url: "/article" };
          default:
            return { title: "文章列表", url: "/live " };
        }
      }
    })
  },
  methods: {
    /** 通过标题向github请求文章详细内容 **/
    getData(id) {
      if (!id) {
        return null;
      }
      // 先读缓存
      if (this.blogCache) {
        this.sourceData = this.blogCache.body;
        return;
      }
      this.$store
        .dispatch({
          type: "app/getBlogDetail",
          url: id
        })
        .then(res => {
          if (res.status === 200) {
            this.sourceData = res.data;
          }
        });
    },
    /** 初始化评论 **/
    initGitMent() {
      if (!this.$route.params.id) {
        return;
      }

      const myTheme = {
        render(state, instance) {
          const container = document.createElement("div");
          container.lang = "en-US";
          container.className = "gitment-container gitment-root-container";
          container.appendChild(instance.renderHeader(state, instance));
          container.appendChild(instance.renderEditor(state, instance));
          container.appendChild(instance.renderComments(state, instance));
          container.appendChild(instance.renderFooter(state, instance));
          return container;
        }
      };

      const gitment = new Gitment({
        id: this.$route.params.id,
        owner: masterName,
        repo: issueName,
        oauth: {
          client_id,
          client_secret
        },
        theme: myTheme
      });

      gitment.render("gitment-box");
    }
  }
};
</script>

<style lang="less">
.page-detail {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  .the-body {
    padding: 0 !important;
    overflow-x: hidden;
    font-size: 16px;
  }
  .info {
    letter-spacing: 1px;
    .title {
      font-size: 32px;
      letter-spacing: 1px;
    }
    .date {
      margin-top: 8px;
      font-size: 16px;
      color: #888;
    }
    border-bottom: solid 1px #e0e0e0;
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
  .loading-box {
    padding: 48px;
    text-align: center;
    display: block;
    margin: 0 auto;
    color: #888;
    font-size: 14px;
    div {
      margin-top: 8px;
    }
  }
  .the-end {
    padding: 50px 0;
    text-align: center;
    font-size: 14px;
    color: #888;
    span {
      padding: 0 24px;
    }
  }
  .bread {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    i {
      margin-right: 8px;
      margin-left: -5px;
      color: #0acb79;
    }
  }
}

@media only screen and (max-width: 640px) {
  .gitment-editor-login {
    width: 42px !important;
    margin-right: 0 !important;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
