<template>
  <div id="home" class="home" @mousewheel="onMouseWheel" @DOMMouseScroll="onMouseWheel">
      <Header :pageNow="pageNow"/>
      <div id="scroller" class="scroller">
          <ul class="scroll-wrapper">
              <li class="scroll-page"><Page1 :pageNow="pageNow"></Page1></li>
              <li class="scroll-page"><Page2 :pageNow="pageNow"></Page2></li>
              <li class="scroll-page">3</li>
          </ul>
      </div>
  </div>
</template>

<script>
import { isPc } from "../util/tools";
import IScroll from "iscroll";
import Page1 from "./homePages/Page1.vue";
import Page2 from "./homePages/Page2.vue";
import Header from "../components/Header.vue";
export default {
  name: "home",
  data: function() {
    return {
      scrollDom: null,
      scrolling: false, // 是否正在滚动中
      pageNow: 0
    };
  },
  mounted: function() {
    this.initScroll();
  },
  beforeDestroy: function() {
    this.scrollDom && this.scrollDom.destroy();
  },
  components: {
    Header,
    Page1,
    Page2
  },
  methods: {
    initScroll() {
      const pc = isPc();
      console.log('现在是PC吗', pc);
      this.scrollDom = new IScroll("#scroller", {
          snap: true,
          bounceEasing: {
              style: pc ? 'cubic-bezier(1,0.1,0.1,1)' : 'cubic-bezier(1,1,1,1)'
          },
          bounceTime: pc ? 1000 : 300,
          preventDefault: pc,
          disablePointer: true,
      });
      this.scrollDom.on('scrollEnd', () => {
          this.scrolling = false;
      });
    },
      onMouseWheel(e) {
        console.log('滚动：', e);
        const f = e.wheelDeltaY || -e.detail;
        if(this.scrolling) {
            return;
        }
        let pageNow = 1;
        if (f<0 && this.pageNow < 2) {          // 向下滚动
            this.scrolling = true;
            this.pageNow++;
            this.scrollDom && this.scrollDom.goToPage(1,this.pageNow, 1000);
        } else if (f>0 && this.pageNow > 0){    // 向上滚动
            this.scrolling = true;
            this.pageNow--;
            this.scrollDom && this.scrollDom.goToPage(1,this.pageNow, 1000);
        }
      },
  }
};
</script>

<style scoped lang="less">
.home {
  background-color: #222;
  .scroller {
      height: 100vh;
      min-height: 400px;
      display: block;
      overflow: hidden;
    .scroll-wrapper {
      display: block;
      width: 100%;
      .scroll-page{
          display: block;
          width: 100%;
          height: 100vh;
          min-height: 300px;
          background-color: #fff;
          &:last-child{
              height: 300px;
          }
      }
    }
  }
}
</style>
