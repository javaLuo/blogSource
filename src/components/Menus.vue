<template>
    <div class="menus">
        <div class="back-img-box"></div>
        <CanvasBack v-if="isPc"></CanvasBack>
        <div class="info-box">
            <div class="photo-box">
                <img class="photo" :src="ImgPic" />
                <div class="playing" :class="{ stop: !play }"></div>
                <div class="play-btn" @click="playOrStop">
                    <div class="line" :class="{ play }"></div>
                </div>
            </div>
            <div class="name">Logic</div>
            <div class="func">web前端开发工程师</div>
            <ul class="list-info">
                <li>文章 {{ liveLength }}</li>
                <li>作品 {{ workLength }}</li>
                <li>日志 {{ articleLength }}</li>
            </ul>
            <ul class="link">
                <li><router-link to="/live">文章列表</router-link></li>
                <li><router-link to="/works">所有作品</router-link></li>
                <li><router-link to="/article">日志列表</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import ImgPic from "../assets/pic.jpg";
import CanvasBack from "./CanvasBack.vue";
import { mapState } from "vuex";
import { getBlogInfo, isPc } from "../util/tools";
export default {
  name: "Menus",
  data: function() {
    return {
      ImgPic,
      isPc: isPc()
    };
  },
  methods: {
    playOrStop() {
      console.log("所以你为什么不变？", this.play);
      this.$store.dispatch({
        type: "page/setPlaying",
        params: { playing: !this.play }
      });
    }
  },
  components: {
    CanvasBack
  },
  computed: {
    ...mapState({
      play: state => state.page.playing,
      liveLength: state =>
        state.app.blogList.filter(item => getBlogInfo(item.name).type === 1)
          .length,
      workLength: state =>
        state.app.blogList.filter(item => getBlogInfo(item.name).type === 2)
          .length,
      articleLength: state =>
        state.app.blogList.filter(item => getBlogInfo(item.name).type === 3)
          .length
    })
  }
};
</script>

<style scoped lang="less">
@keyframes go-round {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.menus {
  position: relative;
  width: 30vw;
  height: 100%;
  max-width: 512px;
  box-sizing: border-box;
  padding: 0 8px;
  z-index: 2;
  .back-img-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    background-image: url(../assets/menu_back.png);
    background-size: cover;
    background-position: bottom center;
  }
  .info-box {
    width: 100%;
    color: #fff;
    letter-spacing: 1px;
    text-align: center;
    z-index: 2;
    .photo-box {
      position: relative;
      display: block;
      width: 26%;
      margin: 15vh auto 0 auto;
      padding: 13% 0 13% 0;
      .photo {
        position: absolute;
        display: block;
        box-sizing: border-box;
        top: 2px;
        left: 2px;
        width: calc(100% - 3px);
        height: calc(100% - 3px);
        border-radius: 100%;
        border: solid 1px #fff;
        z-index: 2;
      }
      .playing {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: linear-gradient(#ffb765, rgba(0, 0, 0, 0));
        animation: go-round 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        opacity: 1;
        z-index: 1;
        &.stop {
          animation-play-state: paused;
        }
      }
      .play-btn {
        cursor: pointer;
        position: absolute;
        box-sizing: border-box;
        top: 2px;
        left: 2px;
        width: calc(100% - 3px);
        height: calc(100% - 3px);
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: all 200ms;
        z-index: 3;
        &:hover {
          opacity: 1;
        }
        .line {
          position: absolute;
          height: 25%;
          width: 25%;
          top: 37.5%;
          left: 30%;
          transition: all 200ms;
          transform: rotate(45deg);
          border: none;
          border-top: solid 1px #fff;
          border-right: solid 1px #fff;
          &.play {
            height: 40%;
            width: 10px;
            top: 30%;
            left: calc(50% - 5px);
            transform: rotate(0);
            border: none;
            border-left: solid 1px #fff;
            border-right: solid 1px #fff;
          }
        }
      }
    }
    .name {
      font-size: 24px;
      margin-top: 24px;
    }
    .func {
      font-size: 14px;
      margin-top: 12px;
    }
    .list-info {
      display: flex;
      justify-content: center;
      font-size: 14px;
      margin-top: 24px;
      & > li {
        padding: 4px;
        &:first-child {
          color: aqua;
        }
        &:nth-child(2) {
          color: salmon;
        }
        &:nth-child(3) {
          color: lawngreen;
        }
      }
    }
    .link {
      margin-top: 24px;
      & > li {
        margin-bottom: 16px;
        a {
          color: #fff;
          display: block;
          box-sizing: border-box;
          width: 100%;
          padding: 4px;
          position: relative;
          transition: all 200ms;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            max-width: 250px;
            height: 1px;
            background-color: #fff;
            transition: all 200ms;
          }
          &:hover {
            &::after {
              width: 80%;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .menus {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    .back-img-box {
      width: 80%;
      box-shadow: 3px 0 8px rgba(0, 0, 0, 0.5);
    }
    .info-box {
      width: 80%;
    }
  }
}
</style>
