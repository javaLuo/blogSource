<template>
  <div class="page1" :class="{show: isShow}">
      <div class="shadow all_trans1s"></div>
      <img class="logo" :src="ImgLogo" />
      <div class="info-box">
          <span class="all_trans1s title">ISLUO BLOG</span>
          <div class="all_trans1s">hide in the city</div>
          <div class="all_trans1s">no card, no phone, no ID</div>
      </div>
      <img class="down" :src="ImgDown" />
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
      ImgDown
    };
  },
  props: ["pageNow"],
  components: {},
  mounted() {
    if (this.pageNow === 0) {
      this.isShow = true;
    }
  },
  beforeUpdate() {
    this.isShow = this.pageNow === 0;
  }
};
</script>

<style scoped lang="less">
@keyframes animate-light {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 0.4;
  }
  10% {
    opacity: 0.9;
  }
  12% {
    opacity: 0.4;
  }
  25% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
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
  background-image: url(../../assets/page1-back.jpg);
  background-size: cover;
  background-position: top center;
  &.show {
    .shadow {
      opacity: 0.9;
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
    .logo {
      animation: animate-light 4s;
      animation-iteration-count: infinite;
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
  .logo {
    flex: none;
    width: 36px;
    height: auto;
    z-index: 2;
  }
  .info-box {
    flex: auto;
    margin-top: 16vh;
    color: #d0d0d0;
    text-align: center;
    z-index: 2;
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
      font-family: Futura-Thin;
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
