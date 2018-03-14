<template>
  <div id="home" class="home" @mousewheel="onMouseWheel" @DOMMouseScroll="onMouseWheel">
      <audio v-if="isPc" class="audio" src="http://isluo.com/imgs/rain.mp3" loop preload id="audio1"></audio>
      <div id="scroller" class="scroller">
          <ul class="scroll-wrapper">
              <li v-if="isPc" class="scroll-page"><Page1 :pageNow="pageNow"></Page1></li>
              <li class="scroll-page"><Page2 :pageNow="pageNow"></Page2></li>
              <li v-if="isPc" class="scroll-page foot-page"><Page3 :pageNow="pageNow"></Page3></li>
          </ul>
      </div>
  </div>
</template>

<script>
import { isPc } from "../util/tools";
import IScroll from "iscroll";
import Page1 from "./homePages/Page1.vue";
import Page2 from "./homePages/Page2.vue";
import Page3 from "./homePages/Page3.vue";
import Header from "../components/Header.vue";
import { mapState } from "vuex";
export default {
  name: "home",
  data: function() {
    return {
      isPc: isPc(),
      scrollDom: null,
      scrolling: false, // 是否正在滚动中
      pageNow: 0,
      mp3Dom: {
        // audio, 一个音轨
        a: null
      }
    };
  },
  props: {},
  components: {
    Header,
    Page1,
    Page2,
    Page3
  },
  computed: {
    ...mapState({
      play: state => state.page.playing
    })
  },
  mounted: function() {
    /** PC端才初始化iscroll和声音 **/
    if (this.isPc) {
      this.initScroll();
      this.mp3Dom.a = document.getElementById("audio1");
      this.mp3Dom.a.volume = 0;
      this.mp3Dom.a.ontimeupdate = e => {
        if (this.mp3Dom.a.duration - 3 < this.mp3Dom.a.currentTime) {
          this.mp3Dom.a.currentTime = 2;
        }
      };
    }
    /** 获取博客列表 **/
    this.getBlogList();
  },
  beforeDestroy: function() {
    /** 离开前销毁iscroll实例 **/
    this.scrollDom && this.scrollDom.destroy();
  },
  methods: {
    /** 初始化页面全局滚动 **/
    initScroll() {
      this.scrollDom = new IScroll("#scroller", {
        snap: true,
        bounceEasing: {
          style: "cubic-bezier(1,0.1,0.1,1)"
        },
        bounceTime: 1000,
        preventDefault: true,
        disablePointer: true
      });
      this.scrollDom.on("scrollEnd", () => {
        this.scrolling = false;
      });
    },
    /** 监听滚轮事件处理页面滚动 **/
    onMouseWheel(e) {
        console.log('有在触发吗,IE', e);
      const f = e.wheelDeltaY || -e.detail || e.wheelDelta;
      if (this.scrolling) {
        return;
      }

      if (f < 0 && this.pageNow < 2) {
        // 向下滚动
        this.scrolling = true;
        this.pageNow++;
        this.scrollDom && this.scrollDom.goToPage(1, this.pageNow, 1000);
        console.log("滚动：", this.scrollDom);
      } else if (f > 0 && this.pageNow > 0) {
        // 向上滚动
        this.scrolling = true;
        this.pageNow--;
        this.scrollDom && this.scrollDom.goToPage(1, this.pageNow, 1000);
      }
    },
    /** 音频事件，开始播放 **/
    onMp3Play() {
      this.mp3Dom.a.play();
      this.volumeUp();
    },
    /** 音频事件，暂停播放 **/
    onMp3Pause() {
      this.volumeDown();
    },
    /** 音频音量调大 **/
    volumeUp() {
      clearTimeout(this.volumeTimer);
      if (this.mp3Dom.a.volume + 0.1 <= 1) {
        this.mp3Dom.a.volume += 0.1;
        this.volumeTimer = setTimeout(() => {
          this.volumeUp();
        }, 200);
      }
    },
    /** 音频音量调小 **/
    volumeDown() {
      clearTimeout(this.volumeTimer);
      if (this.mp3Dom.a.volume - 0.1 >= 0) {
        this.mp3Dom.a.volume -= 0.1;
        this.volumeTimer = setTimeout(() => {
          this.volumeDown();
        }, 200);
      } else {
        this.mp3Dom.a.pause();
      }
    },
    /** 进入页面及获取所有文章列表 **/
    getBlogList() {
      this.$store.dispatch({
        type: "app/getBlogList",
        params: null
      });
    }
  },
  watch: {
    pageNow(newV, oldV) {
      console.log("pageNow变化：", newV, oldV);
      if (newV !== 0 && this.play) {
        this.onMp3Play();
      } else {
        this.onMp3Pause();
      }
    },
    play(newV, oldV) {
      if (newV) {
        this.onMp3Play();
      } else {
        this.onMp3Pause();
      }
    }
  }
};
</script>

<style scoped lang="less">
.home {
  background-color: #222;
  overflow: hidden;
  .scroller {
    height: 100vh;
    min-height: 300px;
    display: block;
    overflow: hidden;
    .scroll-wrapper {
      display: block;
      width: 100%;
      .scroll-page {
        display: block;
        width: 100%;
        height: 100vh;
        min-height: 300px;
        background-color: #fff;
        &.foot-page {
          height: 300px;
        }
      }
    }
  }
}
</style>
