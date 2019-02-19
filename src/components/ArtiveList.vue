<template>
  <li class="artive-list">
    <div class="title"
         @click="onDetailChose">{{ blogInfo.title }}</div>
    <div class="time">{{ blogInfo.date }}</div>
    <div v-if="blogInfo.pic"
         class="pic"><img :src="blogInfo.pic"></div>
    <div class="info"><span v-html="blogInfo.info"></span></div>
    <div class="tags">
      <div v-for="(item, index) in blogInfo.tags"
           :key="index">{{ item }}</div>
    </div>
    <div class="read-more"
         @click="onDetailChose">阅读全文</div>
  </li>
</template>

<script>
/** 单个数据列表项 **/
import { mapState } from "vuex";
import { Tag } from "element-ui";
export default {
  name: "ArtiveList",
  data: function() {
    return {};
  },
  props: {
    thisData: Object
  },
  components: {
    Tag
  },
  mounted() {},
  computed: {
    ...mapState({
      blogInfo(state) {
        const d = state.app.blogConfig ? state.app.blogConfig.d : [];
        const data = d.find(item => item.gitname === this.thisData.name);
        return data || { title: this.thisData.name };
      }
    })
  },
  methods: {
    /** 点击某篇文章保存相关数据进入详情 **/
    onDetailChose() {
      this.$router.push(`/detail/${this.thisData.name}`);
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
.artive-list {
  width: 100%;
  box-sizing: border-box;
  border-left: solid 5px #d3d3d3;
  padding: 4px 15px;
  list-style: none;
  & + li {
    margin-top: 32px;
  }
  .title {
    font-size: 24px;
    margin-bottom: 8px;
    color: #222;
    transition: all 0.2s;
    cursor: pointer;
    letter-spacing: 1px;
    word-break: break-all;
    word-wrap: break-word;
    &:hover {
      color: #108ee9;
    }
  }
  .time {
    color: #888;
    margin-bottom: 8px;
  }
  .pic {
    box-sizing: border-box;
    margin-bottom: 8px;
    img {
      max-width: 100%;
      max-height: 350px;
      border-radius: 4px;
    }
  }
  .info {
    color: #888;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .tags {
    margin-bottom: 8px;
    display: flex;
    & > div {
      font-size: 12px;
      margin-right: 4px;
      background-color: #2db7f5;
      color: #fff;
      padding: 3px 5px;
      border-radius: 3px;
    }
  }
  .read-more {
    font-size: 16px;
    color: #30634c;
    letter-spacing: 1px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      color: #0366d6;
    }
  }
}
</style>
