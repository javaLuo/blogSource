<template>
  <div class="page-photo">
    <div class="bread">
      <i class="el-icon-location"></i>
      <Breadcrumb>
        <BreadcrumbItem>相册</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <MyLoading :show="!photoList.length" />
    <div class="info-box">
      <ul class="groups-box">
        <li
          v-for="(item, index) in photoGroups"
          :class="{ chose: photoGroupChose === item }"
          @click="onGroupChose(item)"
          :key="index"
        >
          {{ item }}的照片
        </li>
      </ul>
      <transition-group name="animatephoto" tag="ul" class="photos-box">
        <li v-for="(item, index) in photoGroupNow" :key="item.sha">
          <img
            :src="item.download_url"
            :alt="item.name"
            @click="onClickPhoto(index)"
          />
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { Breadcrumb, BreadcrumbItem } from "element-ui";
import { mapState } from "vuex";
import MyLoading from "../components/MyLoading.vue";
export default {
  data: () => {
    return {};
  },
  components: {
    Breadcrumb,
    BreadcrumbItem,
    MyLoading
  },
  mounted() {
    // 进入页面及获取所有相册列表
    if (!this.photoList || !this.photoList.length) {
      this.getPhotoList();
    }
    // console.log("时什么：", this.photoGroups);
  },
  computed: {
    ...mapState({
      photoList: state => state.app.photoList,
      photoGroupChose: state => state.app.photoGroupChose, // 当前选择的哪个相册
      photoGroups: state => state.app.photoGroup
    }),
    // 当前选中的相册数据
    photoGroupNow() {
      return this.photoList.filter(item => {
        const n = item.name.split("|");
        return n[0] === this.photoGroupChose;
      });
    }
  },
  watch: {},
  methods: {
    getPhotoList() {
      this.$store.dispatch({
        type: "app/getPhotoList",
        params: null
      });
    },
    onGroupChose(str) {
      if (str !== this.photoGroupChose) {
        this.$store.commit({
          type: "app/setPhotoChose",
          value: str
        });
      }
    },
    onClickPhoto(which) {
      this.$store.commit({
        type: "app/setPhotoShow",
        show: true,
        which
      });
    }
  }
};
</script>
<style lang="less">
.page-photo {
  min-height: 100%;
  .animatephoto-enter-active {
    transition: all 300ms;
  }
  .animatephoto-enter,
  .animatephoto-leave-to {
    opacity: 0;
    transform: scale(0, 0);
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
  .info-box {
    display: flex;
    .groups-box {
      position: sticky;
      top: 10px;
      flex: none;
      padding: 0 20px 0 0;
      margin: 0;
      list-style: none;
      & > li {
        cursor: pointer;
        position: relative;
        margin-bottom: 20px;
        color: #888;
        padding: 2px 10px;
        &.chose {
          color: #009fde;
        }
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 0;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 1);
          border-radius: 4px;
          transition: all 250ms;
          z-index: -1;
          opacity: 0;
        }
        &:hover {
          color: #fff;
          &::after {
            height: 100%;
            opacity: 1;
          }
        }
      }
    }
    .photos-box {
      flex: 1;
      display: block;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      & > li {
        box-sizing: border-box;
        display: flex;
        height: 25vh;
        min-width: 80px;
        min-height: 100px;
        padding: 10px;
        position: relative;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.1);
        background-image: url(../assets/loading.gif);
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 4px;
        margin: 0 10px 10px 0;
        img {
          display: block;
          max-width: 100%;
          max-height: 100%;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
  @media all and (max-width: 720px) {
    .info-box {
      .photos-box {
        & > li {
          width: 100%;
          & ~ li {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
