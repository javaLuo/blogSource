<template>
    <div class="menus">
        <CanvasBack></CanvasBack>
        <div class="info-box">
            <img class="photo" :src="ImgPic"/>
            <div class="name">Logic</div>
            <div class="func">web前端开发工程师</div>
            <ul class="list-info">
                <li>文章 12</li>
                <li>作品 5</li>
                <li>日志 10</li>
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
export default {
  name: "Menus",
  data: function() {
    return {
      ImgPic
    };
  },
  props: {
    msg: Array
  },
  components: {
    CanvasBack
  },
    computed: {

    }
};
</script>

<style scoped lang="less">
.menus {
  position: relative;
  width: 30vw;
  height: 100%;
  max-width: 512px;
  background-color: #222;
    background-image:url(../assets/menu_back.png);
    background-size: cover;
    background-position: bottom center;
  display: flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;
  .info-box {
    width: 100%;
    color: #fff;
    letter-spacing: 1px;
    text-align: center;
      z-index: 2;
    .photo {
      display: block;
      width: 30%;
      max-width: 120px;
      border-radius: 120px;
      border: solid 1px #fff;
      margin: 0 auto;
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
</style>
