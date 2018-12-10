<template>
  <div class="page-detail"
       :v-loading="true">
    <div class="bread">
      <i class="el-icon-location"></i>
      <Breadcrumb>
        <BreadcrumbItem to="/all">博客列表</BreadcrumbItem>
        <BreadcrumbItem :to="breadType.url">{{ breadType.title }}</BreadcrumbItem>
        <BreadcrumbItem>{{ blogConfig.title }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="info">
      <div class="title">{{ blogConfig.title }}</div>
      <div class="date">{{ blogConfig.date }}</div>
    </div>
    <div v-if="!sourceData"
         class="loading-box">
      <img :src="ImgLoading" />
      <div>正在从开源世界获取…</div>
    </div>
    <div ref="theBody"
         v-html="htmlData"
         class="the-body markdown-body editormd-html-preview"></div>
    <div class="the-end">--<span>End</span>--</div>
    <div id="gitalk-box"
         class="gitalk-box"></div>
  </div>
</template>

<script>
/** 文章的详情页 **/
import { mapState } from "vuex";

import "gitalk/dist/gitalk.css";
import { masterName, issueName, client_id, client_secret } from "../../config";
import ShowDown from "showdown";
import Gitalk from "gitalk";
import ImgLoading from "../../assets/loading.gif";

import { Button, Breadcrumb, BreadcrumbItem } from "element-ui";

const converter = new ShowDown.Converter({ tables: true });
export default {
  name: "live",
  data: function() {
    return {
      sourceData: null,
      ImgLoading,
      htmlData: ""
    };
  },
  components: {
    Button,
    Breadcrumb,
    BreadcrumbItem
  },
  mounted() {
    this.getData(this.$route.params.id);

    this.initGitTalk(); // 初始化评论
  },
  watch: {
    sourceData() {
      this.htmlData = converter.makeHtml(this.sourceData);
      this.$nextTick(() => {
        // color-brewer
        const allCodesDom = document.querySelectorAll("pre code");
        Array.from(allCodesDom).forEach(item => {
          window.hljs.highlightBlock(item);
        });
      });
    }
  },
  computed: {
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
    initGitTalk() {
      if (!this.$route.params.id) {
        return;
      }

      const gitalk = new Gitalk({
        clientID: client_id, // github授权ID
        clientSecret: client_secret, // github授权证明
        id: this.$route.params.id, // 文章唯一标识
        owner: masterName, // 评论存储项目的所有者github名称
        repo: issueName, // 评论存储项目
        admin: [masterName], // 拥有写权利的github名称，即可以新建issue的帐号
        title: `${document.title} ${this.$route.params.id}`, // 新建的issue的标题
        distractionFreeMode: false // 是否开启全屏遮罩效果
      });

      gitalk.render("gitalk-box");
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
</style>
