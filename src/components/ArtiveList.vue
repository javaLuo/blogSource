<template>
    <li class="artive-list">
        <div class="title" @click="onDetailChose">{{ d.title }}</div>
        <div class="time">{{ d.date }}</div>
        <div class="info"><span v-html="d.info"></span></div>
        <div class="read-more"  @click="onDetailChose">Read More</div>
    </li>
</template>

<script>
/** 单个数据列表项 **/
export default {
  name: "ArtiveList",
  data: function() {
    return {
        d: {},
    };
  },
  props: {
    thisData: Object
  },
    mounted() {
      this.makeData(this.thisData);
    },
    methods: {
      /** 解析名字 **/
      makeData(data) {
          const temp = data.name.split('_');
          this.d = {
              title: temp[0],
              type: temp[1],
              date: temp[2],
              info: temp[3],
          }
      },
      /** 点击某篇文章保存相关数据进入详情 **/
      onDetailChose() {
          console.log('到这了吧：', this.thisData);
//          this.$store.dispatch({
//              type: 'app/saveDetailNow',
//              data: this.thisData,
//          });
          this.$router.push(`/detail/${this.thisData.name}`);
      }
    },
    watch: {
      thisData(newV, oldV) {
          this.makeData(newV);
      }
    }
};
</script>

<style scoped lang="less">
.artive-list {
  width: 100%;
  box-sizing: border-box;
  border-left: solid 5px #d3d3d3;
  padding: 4px 8px;
  & + li {
    margin-top: 32px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
    a {
      color: #222;
      transition: all 0.2s;
      &:hover {
        color: #30634c;
      }
    }
  }
  .time {
    color: #888;
    margin-bottom: 8px;
  }
  .info {
    color: #888;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .read-more {
    font-size: 16px;
    a {
      color: #30634c;
      letter-spacing: 1px;
      font-style: italic;
      transition: all 0.2s;
      &:hover {
        color: #0acb79;
      }
    }
  }
}
</style>
