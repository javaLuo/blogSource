<template>
    <li class="artive-list">
        <div class="title" @click="onDetailChose">{{ blogInfo.title }}</div>
        <div class="time">{{ blogInfo.date }}</div>
        <div v-if="blogInfo.pic" class="pic"><img :src="blogInfo.pic"></div>
        <div class="info"><span v-html="blogInfo.info"></span></div>
        <div class="tags">
            <Tag v-for="item in blogInfo.tags" size="small">{{ item }}</Tag>
        </div>
        <div class="read-more"  @click="onDetailChose">Read More</div>
    </li>
</template>

<script>
/** 单个数据列表项 **/
import { getBlogInfo } from '../util/tools';
import { Tag } from 'element-ui';
export default {
  name: "ArtiveList",
  data: function() {
    return {
    };
  },
  props: {
    thisData: Object
  },
    components: {
      Tag,
    },
  mounted() {
        console.log('来了没有：', this.thisData);
  },
  computed: {
      blogInfo() {
          console.log('blogInfo?', this.thisData.name);
        return getBlogInfo(this.thisData.name);
    }
  },
  methods: {
    /** 点击某篇文章保存相关数据进入详情 **/
    onDetailChose() {
      console.log("到这了吧：", this.thisData);
      this.$router.push(`/detail/${this.thisData.name}`);
    }
  },
  watch: {

  }
};
</script>

<style scoped lang="less">
.artive-list {
  width: 100%;
  box-sizing: border-box;
  border-left: solid 5px #d3d3d3;
  padding: 4px 8px;
  & + li {
    margin-top: 32px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
      color: #222;
      transition: all 0.2s;
      cursor: pointer;
      &:hover {
          color: #30634c;
      }
  }
  .time {
    color: #888;
    margin-bottom: 8px;
  }
  .info {
    color: #888;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
    .tags{
        margin-bottom: 8px;
        span{
            font-size: 12px;
            margin-right: 4px;
        }
    }
  .read-more {
    font-size: 16px;
      color: #30634c;
      letter-spacing: 1px;
      font-style: italic;
      transition: all 0.2s;
      cursor:pointer;
      &:hover {
          color: #0acb79;
      }
  }
}
</style>
