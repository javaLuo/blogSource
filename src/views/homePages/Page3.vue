<template>
  <div class="page3">
    <div class="logo-box">
      <a href="https://cn.vuejs.org" target="_blank" title="vue.js"
        ><img :src="LogoVue"
      /></a>
      <a href="https://github.com/javaLuo" target="_blank" title="github"
        ><img :src="LogoGitHub"
      /></a>
      <a href="http://www.w3school.com.cn/" target="_blank" title="w3school"
        ><img :src="LogoW3C"
      /></a>
      <a
        href="https://developer.mozilla.org/"
        target="_blank"
        title="mozilla.org"
        ><img :src="LogoHTML5"
      /></a>
    </div>
    <div class="info-box">
      <div>Vue.js 全家桶框架支持</div>
      <div>GitHub API 文章及评论支持</div>
      <div>感谢开源世界的恩惠</div>
    </div>
    <div class="last">
      <img :src="ImgPic" />
      <span
        >© 2014–2019
        <a href="https://isluo.com" target="_blank">isluo.com</a> Ltd.</span
      >
    </div>
  </div>
</template>

<script>
import LogoVue from "../../assets/logo-vue.png";
import LogoGitHub from "../../assets/logo-github.png";
import LogoW3C from "../../assets/logo-w3school.png";
import LogoHTML5 from "../../assets/logo-html5.png";
import ImgPic from "../../assets/myhead.png";
export default {
  name: "page3",
  data: function() {
    return {
      LogoVue,
      LogoGitHub,
      LogoW3C,
      LogoHTML5,
      ImgPic
    };
  },
  components: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.page3 {
  position: relative;
  background-color: #222;
  height: 100%;
  .logo-box {
    display: flex;
    margin: 0 auto;
    max-width: 960px;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 32px;
    img {
      max-height: 80px;
    }
  }
  .info-box {
    text-align: center;
    color: #ccc;
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 22px;
  }
  .last {
    text-align: center;
    margin-top: 32px;
    color: #888;
    font-size: 14px;
    letter-spacing: 1px;
    img {
      height: 40px;
      margin-right: 8px;
    }
    a {
      color: #888;
      transition: all 200ms;
      &:hover {
        color: #e0e0e0;
      }
    }
  }
}
</style>
