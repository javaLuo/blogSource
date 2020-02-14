<template>
  <div class="live-box">
    <div class="bread">
      <i class="el-icon-location"></i>
      <Breadcrumb>
        <BreadcrumbItem to="/all">博客列表</BreadcrumbItem>
        <BreadcrumbItem>个人作品</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <transition-group name="list" tag="ul" class="live">
      <ArtiveList
        v-for="v in pageNowData"
        :thisData="v"
        :key="v.name"
      ></ArtiveList>
    </transition-group>
    <MyLoading :show="!pageNowData.length" />
    <div class="pagin">
      <Pagination
        :total="total"
        :current-page="pageNow"
        :pageSize="pageSize"
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
import { sortDate } from "../../util/tools";
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
      setTimeout(() => this.pageNowData.push(temp[i]), (i + 1) * 100);
    }
  },
  computed: {
    ...mapState({
      listData(state) {
        const s = state.app.blogConfig.filter(item => item.type === 2);
        this.total = s.length;
        return sortDate(s).filter(
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
    &li + li {
      margin-top: 16px;
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
