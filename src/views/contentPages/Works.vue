<template>
    <div class="work-box">
        <div class="bread">
            <i class="el-icon-location"></i>
            <Breadcrumb>
                <BreadcrumbItem to="/all">博客列表</BreadcrumbItem>
                <BreadcrumbItem>作品列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <transition-group name="list" tag="ul" class="live">
            <ArtiveList class="swiper-slide" v-for="(v, index) in pageNowData" :thisData="v" :key="index"></ArtiveList>
        </transition-group>
        <div class="nothing" v-if="!pageNowData.length">
            <img :src="ImgLoading" />
            <div>正在从开源世界获取…</div>
        </div>
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
/** 作品列表页 **/
import { mapState } from "vuex";
import { Pagination, Breadcrumb, BreadcrumbItem } from "element-ui";
import ArtiveList from "../../components/ArtiveList.vue";
import { getBlogInfo, sortDate } from "../../util/tools";
import ImgLoading from "../../assets/loading.gif";
export default {
  name: "live",
  data: function() {
    return {
      ImgLoading,
      pageNow: 1,
      pageSize: 10,
      total: 0,
      pageNowData: []
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
    const temp = this.listData.filter(
      (item, index) =>
        index >= (this.pageNow - 1) * 10 && index < this.pageNow * 10
    );
    for (let i = 0; temp[i]; i++) {
      setTimeout(() => this.pageNowData.push(temp[i]), i * 100);
    }
  },
  computed: {
    ...mapState({
      listData: state =>
        state.app.blogConfig
          ? sortDate(
              state.app.blogList.filter(
                item =>
                  getBlogInfo(item.name, state.app.blogConfig.d).type === 2
              ),
              state.app.blogConfig.d
            )
          : []
    })
  },
  watch: {
    listData(newV, oldV) {
      this.total = newV.length;
      const temp = this.listData.filter(
        (item, index) =>
          index >= (this.pageNow - 1) * 10 && index < this.pageNow * 10
      );
      for (let i = 0; temp[i]; i++) {
        setTimeout(() => this.pageNowData.push(temp[i]), i * 100);
      }
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
.list-enter-active,
.list-leave-active {
  transition: all 500ms;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.work-box {
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
