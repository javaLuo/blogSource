<template>
  <div class="page2" :class="{show: isShow}">
      <Menus></Menus>
      <router-view></router-view>
  </div>
</template>

<script>
import Menus from '../../components/Menus.vue';
export default {
  name: "page2",
  data: function() {
    return {
      isShow: false,
    };
  },
  props: {
      pageNow: Number,
  },
  components: {
      Menus,
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
    .page2{
        height: 100%;
        display: flex;
    }
</style>
