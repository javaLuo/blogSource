<template>
    <ul class="live" @mousewheel="onMousewheel" @DOMMouseScroll="onMousewheel" @touchmove="onMousewheel">
        <ArtiveList class="swiper-slide" v-for="(v, index) in listData" :thisData="v" :key="index"></ArtiveList>
    </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ArtiveList from "../../components/ArtiveList.vue";
export default {
  name: "live",
  data: function() {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    ArtiveList
  },
  mounted() {},
  computed: {
      ...mapState({
        listData: state => state.app.blogList,
      })
  },
  methods: {
    onMousewheel(e) {
      const f = e.wheelDeltaY || -e.detail;
      const st = this.$el.scrollTop;
      const sh = this.$el.scrollHeight;
      const ch = this.$el.clientHeight;
      console.log("子级：", st, sh, ch, f);
      if ((f < 0 && st + ch !== sh) || (f > 0 && st !== 0)) {
        e.stopPropagation();
      }
    }
  }
};
</script>

<style scoped lang="less">
.live {
  display: block;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 32px;
}
</style>
