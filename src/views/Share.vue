<template>
  <div class="page-share">
    <div class="bread">
      <i class="el-icon-location"></i>
      <el-breadcrumb>
        <el-breadcrumbItem>收藏和分享</el-breadcrumbItem>
      </el-breadcrumb>
    </div>
    <transition-group name="list" tag="ul" class="list-ul">
      <li v-for="v in pageNowData" :key="v.title">
        <div class="title">{{ v.title }}</div>
        <iframe
          class="share-iframe"
          :src="v.url"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
        ></iframe>
      </li>
    </transition-group>
    <MyLoading :show="!pageNowData.length" />
    <div class="pagin">
      <el-pagination
        :total="total"
        :current-page="pageNow"
        :pageSize="pageSize"
        layout="total, prev, pager, next"
        @current-change="onPageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/** 文章列表页 **/
import { mapState } from "vuex";
import { sortDate } from "@/util/tools";
import MyLoading from "@/components/MyLoading";
import { share } from "@/config";
export default {
  name: "share",
  data: function() {
    return {
      pageNow: 1,
      pageSize: 5,
      total: 0,
      pageNowData: []
    };
  },
  components: {
    MyLoading
  },
  mounted() {
    const temp = this.listData;
    for (let i = 0; temp[i]; i++) {
      setTimeout(() => this.pageNowData.push(temp[i]), (i + 1) * 100);
    }
  },
  computed: {
    ...mapState({
      listData(state) {
        this.total = share.length;
        return share.filter(
          (item, index) =>
            index >= (this.pageNow - 1) * this.pageSize &&
            index < this.pageNow * this.pageSize
        );
      }
    })
  },
  watch: {
    listData(newV) {
      this.pageNowData = [];
      document.getElementById("bodyBox").scrollTop = 0;
      const temp = newV;
      for (let i = 0; temp[i]; i++) {
        setTimeout(() => this.pageNowData.push(temp[i]), i * 100);
      }
    }
  },
  methods: {
    /** 页码改变时触发 **/
    onPageChange(v) {
      this.pageNow = v;
    }
  }
};
</script>

<style scoped lang="less">
.list-enter-active {
  transition: all 500ms;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.page-share {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  min-height: 100%;
  .list-ul {
    display: block;
    width: 100%;
    flex: auto;
    margin: 0;
    padding: 0;
    min-height: 300px;
    list-style: none;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 22px;
      color: #222;
      letter-spacing: 1px;

      word-break: break-all;
      word-wrap: break-word;
    }
    & > li {
      position: relative;
      padding: 34%;
      iframe {
        position: absolute;
        width: 100%;
        height: calc(100% - 30px);
        top: 30px;
        left: 0;
        border-radius: 4px;
      }
      & + li {
        margin-top: 20px;
      }
    }
  }
  .pagin {
    margin-top: 8px;
    flex: none;
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
