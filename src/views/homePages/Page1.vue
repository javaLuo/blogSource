<template>
  <div class="page1"
       :class="{show: isShow}"
       :style="`background-image: url(https://isluo.com/imgs/blogimg/${imgNum}.jpg)`">
    <div class="shadow all_trans1s"></div>

    <div class="info-box">
      <span class="all_trans1s title">ISLUO BLOG</span>
      <div class="all_trans1s">hide in the city</div>
      <div class="all_trans1s">no card, no phone, no ID</div>
    </div>
    <img class="down"
         :src="ImgDown" />
  </div>
</template>

<script>
import ImgLogo from "../../assets/logo.png";
import ImgDown from "../../assets/down.png";

export default {
  name: "page1",
  data: function() {
    return {
      isShow: false,
      ImgLogo,
      ImgDown,
      imgNum: 0 // 首页随机背景图的编号
    };
  },
  props: ["pageNow"],
  beforeMount() {
    this.imgNum = this.getRandom(0, 3);
  },
  mounted() {
    if (this.pageNow === 0) {
      this.isShow = true;
    }
  },
  beforeUpdate() {
    this.isShow = this.pageNow === 0;
  },
  methods: {
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
};
</script>

<style scoped lang="less">
@keyframes animate-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}

.page1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  height: 100%;
  background-size: cover;
  background-position: top center;
  &.show {
    .shadow {
      opacity: 0.8;
    }
    .info-box {
      & > div {
        transform: scale(1);
        letter-spacing: 1px;
        margin-bottom: 8px;
        opacity: 1;
      }
      .dot {
        opacity: 0.7;
      }
      .title {
        opacity: 1;
      }
    }
  }
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 1;
    z-index: 1;
  }
  .info-box {
    flex: auto;
    margin-top: 20vh;
    color: #d0d0d0;
    text-align: center;
    z-index: 2;
    font-size: 12px;
    & > div {
      letter-spacing: 8px;
      transform: scale(2);
      opacity: 0;
      &:nth-child(2) {
        transition-delay: 0.4s;
      }
      &:nth-child(3) {
        transition-delay: 0.6s;
      }
    }
    .title {
      display: block;
      font-size: 36px;
      letter-spacing: 2px;
      color: #f0f0f0;
      margin-bottom: 32px;
      transition-delay: 0.6s;
      opacity: 0;
    }
  }
  .down {
    flex: none;
    margin-bottom: 16px;
    width: 16px;
    z-index: 2;
    animation: animate-down 1s;
    animation-iteration-count: infinite;
  }
}
</style>
