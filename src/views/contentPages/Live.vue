<template>
    <ul class="live" @mousewhell.stop="testScroll">
        <ArtiveList v-for="(v, index) in listData.article" :thisData="v" :key="index"></ArtiveList>
    </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ArtiveList from "../../components/ArtiveList.vue";
import listData from "../../util/data";
export default {
  name: "live",
  data: function() {
    return {
      username: "",
      password: "",
      listData
    };
  },
  components: {
    ArtiveList
  },
  methods: {
    testScroll: function() {
      console.log("触发了Scroll");
    }
  },
  mounted() {
    console.log("取到值了吗：", this.allData);
  },
  computed: {
    allData() {
      return this.listData.article;
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
