<template>
  <div class="my-loading"
       v-show="show">
    <img :src="ImgLoading" />
    <div>正在从开源世界获取…</div>
  </div>
</template>

<script>
import ImgLoading from "../assets/loading.gif";
export default {
  data: function() {
    return {
      ImgLoading
    };
  },
  props: {
    show: { type: Boolean, default: false }
  }
};
</script>
<style lang="less" scoped>
.my-loading {
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
</style>