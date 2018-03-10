<template>
    <div class="page-detail" @mousewheel="onMousewheel" @DOMMouseScroll="onMousewheel" @touchmove="onMousewheel">
        <div class="info">
            <div class="title">{{ comDetailInfo.title }}</div>
            <div class="date">{{ comDetailInfo.date }}</div>
        </div>
        <div v-html="htmlData"></div>
        <div id="gitment-box"></div>
    </div>
</template>

<script>
/** 文章的详情页 **/
import { mapState, mapGetters } from "vuex";
import "gitment/style/default.css";
import ShowDown from "showdown";
import Gitment from "gitment";

export default {
  name: "live",
  data: function() {
    return {
      sourceData: null
    };
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
        return "--";
      }
      const temp = this.$route.params.id.split("_");
      return {
        title: temp[0],
        date: temp[2]
      };
    },
    ...mapState({})
  },
  methods: {
    /** 处理滚动事件 **/
    onMousewheel(e) {
      const f = e.wheelDeltaY || -e.detail;
      const st = this.$el.scrollTop;
      const sh = this.$el.scrollHeight;
      const ch = this.$el.clientHeight;
      console.log("子级：", st, sh, ch, f);
      if ((f < 0 && st + ch !== sh) || (f > 0 && st !== 0)) {
        e.stopPropagation();
      }
    },
    /** 通过标题向github请求文章详细内容 **/
    getData(id) {
      if (!id) {
        return null;
      }
      this.$store
        .dispatch({
          type: "app/getBlogDetail",
          url: id
        })
        .then(res => {
          if (res.status === 200) {
            this.sourceData = res.data;
          } else {
          }
        });
    },
    /** 初始化评论 **/
    initGitMent() {
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
        id: this.comDetailInfo.title,
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

<style scoped lang="less">
.page-detail {
  padding: 16px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  .info {
    letter-spacing: 1px;
    .title {
      font-size: 32px;
      font-weight: bold;
    }
    .date {
      font-size: 16px;
      color: #888;
    }
    border-bottom: solid 1px #e0e0e0;
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
}
</style>
