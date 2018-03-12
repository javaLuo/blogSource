<template>
    <div class="live-box">
        <div class="bread">
            <i class="el-icon-location"></i>
            <Breadcrumb>
                <BreadcrumbItem to="/all">博客列表</BreadcrumbItem>
                <BreadcrumbItem>文章列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <ul class="live">
            <ArtiveList class="swiper-slide" v-for="(v, index) in pageNowData" :thisData="v" :key="index"></ArtiveList>
            <div class="nothing" v-if="!pageNowData.length">还没有任何文章</div>
        </ul>
        <div class="pagin">
            <Pagination
                    :total="total"
                    :current-page="pageNow"
                    layout="total, prev, pager, next"
                    @current-change="onPageChange"
            ></Pagination>
        </div>
    </div>
</template>

<script>
/** 文章列表页 **/
import { mapState } from "vuex";
import { Pagination, Breadcrumb, BreadcrumbItem } from "element-ui";
import ArtiveList from "../../components/ArtiveList.vue";
import { getBlogInfo } from "../../util/tools";
export default {
  name: "live",
  data: function() {
    return {
      pageNow: 1,
      pageSize: 10,
      total: 0
    };
  },
  components: {
    ArtiveList,
    Pagination,
    Breadcrumb,
    BreadcrumbItem
  },
  mounted() {
    this.total = this.listData.length;
  },
  computed: {
    ...mapState({
      listData: state =>
        state.app.blogList.filter(item => getBlogInfo(item.name).type === 1)
    }),
    pageNowData() {
      return this.listData.filter(
        (item, index) =>
          index >= (this.pageNow - 1) * 10 && index < this.pageNow * 10
      );
    }
  },
  watch: {
    listData(newV, oldV) {
      this.total = newV.length;
    }
  },
  methods: {
    /** 页码改变时触发 **/
    onPageChange(v) {
      console.log("触发：", v);
      this.pageNow = v;
    }
  }
};
</script>

<style scoped lang="less">
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
    .nothing {
      padding: 40px 0;
      text-align: center;
      color: #888;
    }
  }
  .pagin {
    flex: none;
  }
  .bread {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    i {
      margin-right: 8px;
      color: #0acb79;
    }
  }
}
</style>
