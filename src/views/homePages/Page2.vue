<template>
  <div class="page2" :class="{show: isShow}">
      <Menus @playChange="playChange"></Menus>
      <router-view></router-view>
  </div>
</template>

<script>
import Menus from "../../components/Menus.vue";
export default {
  name: "page2",
  data: function() {
    return {
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
}
</style>
