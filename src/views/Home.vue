<template>
  <div id="home" class="home" @mousewheel="onMouseWheel" @DOMMouseScroll="onMouseWheel">
      <Header :pageNow="pageNow"></Header>
      <audio class="audio" :src="Mp3Rain" loop preload id="audio1"></audio>
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
import Mp3Rain from '../assets/rain.mp3';
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
      pageNow: 0,
        Mp3Rain,
        mp3Dom: {   // audio, 两个音轨
          a: null,
            b: null,
        },
    };
  },
  mounted: function() {
    this.initScroll();
    this.mp3Dom.a = document.getElementById('audio1');
    this.mp3Dom.a.volume = 0;
    this.mp3Dom.a.ontimeupdate = (e) => {
        if (this.mp3Dom.a.duration - 3 < this.mp3Dom.a.currentTime) {
            this.mp3Dom.a.currentTime = 2;
        }
    };
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
      /** 初始化页面全局滚动 **/
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
      /** 监听滚轮事件处理页面滚动 **/
      onMouseWheel(e) {

        const f = e.wheelDeltaY || -e.detail;
        if(this.scrolling) {
            return;
        }

        if (f<0 && this.pageNow < 2) {          // 向下滚动
            this.scrolling = true;
            this.pageNow++;
            this.scrollDom && this.scrollDom.goToPage(1,this.pageNow, 1000);
            console.log('滚动：', this.scrollDom);
        } else if (f>0 && this.pageNow > 0){    // 向上滚动
            this.scrolling = true;
            this.pageNow--;
            this.scrollDom && this.scrollDom.goToPage(1,this.pageNow, 1000);
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
          console.log('volumeUp:', this);
          clearTimeout(this.volumeTimer);
          if (this.mp3Dom.a.volume + 0.1 <= 1) {
              this.mp3Dom.a.volume +=0.1;
              this.volumeTimer = setTimeout(()=>{
                  this.volumeUp();
              } ,200);
          }
      },
      /** 音频音量调小 **/
      volumeDown() {
          clearTimeout(this.volumeTimer);
          if (this.mp3Dom.a.volume - 0.1 >= 0) {
              this.mp3Dom.a.volume -=0.1;
              this.volumeTimer = setTimeout(()=>{
                  this.volumeDown();
              } ,200);
          } else {
              this.mp3Dom.a.pause();
          }
      }
  },
    watch: {
      pageNow(newV, oldV) {
          console.log('pageNow变化：', newV, oldV);
          if (newV !== 0) {
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
