<template>
  <div class="page-photo">
    <div class="bread">
      <i class="el-icon-location"></i>
      <Breadcrumb>
        <BreadcrumbItem>相册</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="info-box">
      <ul class="groups-box">
        <li
          v-for="(item, index) in photoGroups"
          :class="{ chose: photoGroupChose === item }"
          @click="onGroupChose(item)"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
      <transition-group name="animatephoto" tag="ul" class="photos-box">
        <li v-for="item in photoGroupNow" :key="item.sha">
          <img :src="item.download_url" :alt="item.name" />
        </li>
      </transition-group>
    </div>
    <div class="photo-model">
      <div id="photoScroller" class="scroller">
        <ul class="scroll-wrapper" :style="`width:${photoGroupNow.length}00%`">
          <li v-for="item in photoGroupNow" :key="item.sha">
            <img :src="item.download_url" :alt="item.name" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Breadcrumb, BreadcrumbItem } from "element-ui";
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      photoGroupChose: "" // 当前选择的哪个相册
    };
  },
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  mounted() {
    // 进入页面及获取所有相册列表
    if (!this.photoList || !this.photoList.length) {
      this.getPhotoList();
    } else {
      this.photoGroupChose = this.photoGroups[0];
    }
    // console.log("时什么：", this.photoGroups);
  },
  computed: {
    ...mapState({
      photoList: state => state.app.photoList
    }),
    // 对相片原始数据分组
    photoGroups() {
      const g = new Set();
      this.photoList.forEach(item => {
        const n = item.name.split("|");
        g.add(n[0]);
      });
      return Array.from(g);
    },
    // 当前选中的相册数据
    photoGroupNow() {
      return this.photoList.filter(item => {
        const n = item.name.split("|");
        return n[0] === this.photoGroupChose;
      });
    }
  },
  watch: {
    photoGroups(newValue) {
      this.photoGroupChose = newValue[0];
    }
  },
  methods: {
    getPhotoList() {
      this.$store.dispatch({
        type: "app/getPhotoList",
        params: null
      });
    },
    onGroupChose(str) {
      this.photoGroupChose = str;
    }
  }
};
</script>
<style lang="less">
.page-photo {
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
        margin-bottom: 20px;
        &.chose {
          color: #2222ff;
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
      & > li {
        box-sizing: border-box;

        height: 25vh;
        min-width: 50px;
        min-height: 100px;
        padding: 10px;
        position: relative;
        display: inline-block;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-bottom: 10px;
        & ~ li {
          margin-left: 10px;
        }
        img {
          display: block;
          max-width: 100%;
          max-height: 100%;
          border-radius: 4px;
        }
      }
    }
  }
  .photo-model {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    .scroller {
      height: 100%;
      overflow: hidden;
      .scroll-wrapper {
        position: relative;
        margin: 0;
        padding: 0;
        height: 100%;
        margin: 0;
        padding: 0;
        list-style: none;

        & > li {
          display: block;
          flex: none;
          width: 100vw;
          height: 100vh;
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
