<template>
    <div class="page-detail" :v-loading="true">
        <div class="info">
            <div class="title" >{{ comDetailInfo.title }}</div>
            <div class="date">{{ comDetailInfo.date }}</div>
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
import { Button, Loading } from "element-ui";
import { getBlogInfo } from "../../util/tools";
import "gitment/style/default.css";
import ShowDown from "showdown";
import Gitment from "gitment";
import ImgLoading from "../../assets/loading.gif";
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
    Loading
  },
  mounted() {
    console.log("router:", this.$route.params.id);
    this.getData(this.$route.params.id);
    this.initGitMent();
  },
  computed: {
    /** 原始数据转html代码 **/
    htmlData() {
      if (!this.sourceData) {
        return null;
      }
      const converter = new ShowDown.Converter();
      return converter.makeHtml(this.sourceData);
    },
    /** 解析出标题 **/
    comDetailInfo() {
      if (!this.$route.params.id) {
        return {};
      }
      return getBlogInfo(this.$route.params.id);
    },
    ...mapState({
        blogCache(state) {
            return state.app.blogs.find((item) => item.name === this.$route.params.id);
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
        owner: "javaLuo", //7686097,
        repo: "javaimluo",
        oauth: {
          client_id: "238f860ad73e65016c12",
          client_secret: "8ad83943947cae78326975b5bc27e0d179746d8b"
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
  }
  .info {
    letter-spacing: 1px;
    .title {
      font-size: 32px;
      font-weight: bold;
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
    padding: 24px;
    text-align: center;
    font-size: 14px;
    color: #888;
    span {
      padding: 0 24px;
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
