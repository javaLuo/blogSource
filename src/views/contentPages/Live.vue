<template>
  <div class="live-box">
    <div class="bread">
      <i class="el-icon-location"></i>
      <Breadcrumb>
        <BreadcrumbItem to="/all">博客列表</BreadcrumbItem>
        <BreadcrumbItem>文章列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <transition-group name="list"
                      tag="ul"
                      class="live">
      <ArtiveList class="swiper-slide"
                  v-for="(v, index) in pageNowData"
                  :thisData="v"
                  :key="index"></ArtiveList>
    </transition-group>
    <MyLoading :show="!pageNowData.length" />
    <div class="pagin">
      <Pagination :total="total"
                  :current-page="pageNow"
                  :pageSize="pageSize"
                  layout="total, prev, pager, next"
                  @current-change="onPageChange"></Pagination>
    </div>
  </div>
</template>

<script>
/** 文章列表页 **/
import { mapState } from "vuex";
import { Pagination, Breadcrumb, BreadcrumbItem } from "element-ui";
import ArtiveList from "../../components/ArtiveList.vue";
import { getBlogInfo, sortDate } from "../../util/tools";
import MyLoading from "../../components/MyLoading";

export default {
  name: "live",
  data: function() {
    return {
      pageNow: 1,
      pageSize: 12,
      total: 0,
      pageNowData: []
    };
  },
  components: {
    ArtiveList,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    MyLoading
  },
  mounted() {
    const temp = this.listData;
    for (let i = 0; temp[i]; i++) {
      setTimeout(() => this.pageNowData.push(temp[i]), i * 100);
    }
  },
  computed: {
    ...mapState({
      listData(state) {
        if (!state.app.blogConfig) {
          this.total = 0;
          return [];
        }
        const s = state.app.blogList.filter(
          item => getBlogInfo(item.name, state.app.blogConfig.d).type === 1
        );
        this.total = s.length;
        return sortDate(s, state.app.blogConfig.d).filter(
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
      // console.log("触发：", v);
      this.pageNow = v;
    }
  }
};
</script>

<style scoped lang="less">
.list-enter-active,
.list-leave-active {
  transition: all 300ms;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.live-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  min-height: 100%;
  .live {
    display: block;
    width: 100%;
    flex: auto;
    margin: 0;
    padding: 0;
    min-height: 300px;
  }
  .nothing {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
    color: #888;
    div {
      margin-top: 8px;
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
