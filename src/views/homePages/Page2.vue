<template>
  <div class="page2" :class="{show: isShow, mobile: !isPc}">
      <Menus @playChange="playChange"></Menus>
      <div ref="bodyBox" class="body-box" @mousewheel="onMousewheel" @DOMMouseScroll="onMousewheel">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import Menus from "../../components/Menus.vue";
import { isPc } from "../../util/tools";
export default {
  name: "page2",
  data: function() {
    return {
        isPc: isPc(),
      isShow: false,
      scrollDom: null
    };
  },
  props: {
    pageNow: Number
  },
  components: {
    Menus
  },
  methods: {
    onMousewheel(e) {
      const f = e.wheelDeltaY || -e.detail || e.wheelDelta;
      const st = this.$refs.bodyBox.scrollTop;
      const sh = this.$refs.bodyBox.scrollHeight;
      const ch = this.$refs.bodyBox.clientHeight;
      // console.log("子级：", st, sh, ch, f);
      if ((f < 0 && st + ch !== sh) || (f > 0 && st !== 0)) {
        e.stopPropagation();
      }
    },
    playChange(playing) {
      // 菜单中的播放器按钮被点击时触发
      console.log("触发时间：", playing);
      this.$emit();
    }
  },
  mounted() {
    if (this.pageNow === 1) {
      this.isShow = true;
    }
  },
  beforeUpdate() {
    this.isShow = this.pageNow === 1;
  }
};
</script>

<style scoped lang="less">
.page2 {
  height: 100%;
  position: relative;
  display: flex;
  .body-box {
    flex: auto;
    padding: 32px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
    &.mobile {
        .body-box {
            padding-top: 64px;
        }
    }
}
</style>
