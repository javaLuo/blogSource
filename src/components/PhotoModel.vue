<template>
  <div
    :class="['photo-model', { show: show }]"
    @mousewheel.stop
    @mousemove.stop
    @touchmove.stop
  >
    <div
      id="photoScroller"
      class="scroller"
      @mousedown="onMouseDown($event)"
      @touchstart="onMouseDown($event)"
      @mouseup="onMouseUp"
      @touchend="onMouseUp"
      @mousemove="onMouseMove($event)"
      @touchmove="onMouseMove($event)"
    >
      <ul
        :class="['scroll-wrapper', { transition: !isMouseDown && canTrans }]"
        :style="
          `width:${
            photoGroupNow.length
          }00%;transform: translateX(-${left}vw);left:${tempLeft}px`
        "
      >
        <li v-for="item in photoGroupNow" :key="item.sha">
          <img :src="item.download_url" :alt="item.name" draggable="false" />
        </li>
      </ul>
      <!-- 关闭按钮 -->
      <div class="close-btn" @click="onClose">
        <i class="el-icon-close" />
      </div>
      <!-- 导航控制 -->
      <div class="control-box" @mousedown.stop>
        <div class="photo-name">
          {{ photoGroupNow[which] | formartName }}
        </div>
        <div class="btn" @click="onGo(-100)">
          <i class="el-icon-arrow-left" />
        </div>
        <div class="btn" @click="onGo(100)">
          <i class="el-icon-arrow-right" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      left: 0, // 偏移
      which: 0, // 当前选择的哪一张
      canTrans: false, // 有过度
      tempLeft: 0, // 左右拖拽
      isMouseDown: false, // 鼠标是否在当前文档按下
      downX: 0 // 鼠标按下的坐标
    };
  },
  props: {
    show: { type: Boolean, default: false }, // 是否显示
    photos: { type: Array, default: () => [] }, // 所有照片，原始数据
    photoGroupChose: { type: String, default: "" }, // 当前选中的相册
    photoWhich: { type: Number, default: 0 } // 打开时，默认显示哪一张
  },
  computed: {
    // 当前选中的相册数据
    photoGroupNow() {
      return this.photos.filter(item => {
        const n = item.name.split("|");
        return n[0] === this.photoGroupChose;
      });
    }
  },
  watch: {
    // 每次出现时需要定位一下是否是当前图片
    show(newV) {
      if (newV) {
        this.canTrans = false;
        this.left = this.photoWhich * 100;
        this.which = this.photoWhich;
        setTimeout(() => {
          this.canTrans = true;
        }, 128);
      }
    }
  },
  filters: {
    formartName(obj) {
      if (!obj) {
        return "";
      }
      let u = obj.name.split("|");
      u = u.length > 1 ? u[1] : u[0];
      return u.slice(0, u.lastIndexOf("."));
    }
  },
  methods: {
    onClose() {
      this.$store.commit({
        type: "app/setPhotoShow",
        show: false
      });
    },
    onGo(position) {
      const p = this.left + position;
      if (p >= 0 && p < this.photoGroupNow.length * 100) {
        this.left = p;
        this.which = this.which + (position > 0 ? 1 : -1);
      }
    },
    onMouseDown(e) {
      this.isMouseDown = true;
      this.downX = e.clientX || e.changedTouches[0].clientX;
    },
    onMouseUp() {
      this.isMouseDown = false;
      this.$nextTick(() => {
        // 左右拖拉大于一定数值时
        if (Math.abs(this.tempLeft) > 60) {
          this.onGo(this.tempLeft > 0 ? -100 : 100);
        }
        this.tempLeft = 0;
      });
    },
    onMouseMove(e) {
      if (this.isMouseDown) {
        this.tempLeft = (e.clientX || e.changedTouches[0].clientX) - this.downX;
      }
    }
  }
};
</script>
<style lang="less">
.photo-model {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 250ms;
  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
  .close-btn {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    box-shadow: -5px 5px 30px #666;
    text-align: center;
    line-height: 50px;
    border-bottom-left-radius: 100%;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    transition: background-color 250ms;
    &:hover {
      background-color: #d22;
    }
    i {
      transform: translate(8px, -2px);
      font-size: 18px;
    }
  }
  .scroller {
    height: 100%;
    overflow: hidden;
    .scroll-wrapper {
      position: relative;
      margin: 0;
      padding: 0;
      height: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      &.transition {
        transition: transform 300ms, left 300ms;
      }
      & > li {
        user-select: none;
        display: flex;
        flex: none;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
        img {
          display: block;
          max-width: 80%;
          max-height: 80%;
          border-radius: 4px;
          box-shadow: 0 0 124px #222;
        }
      }
    }
    .control-box {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: rgba(0, 0, 0, 0.8);
      text-align: center;
      .photo-name {
        position: absolute;
        left: 50%;
        top: -40px;
        transform: translateX(-50%);
        color: #fff;
      }
      .btn {
        display: inline-block;
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: center;
        cursor: pointer;
        color: #fff;
        transition: color 250ms;
        &:hover {
          color: #2df569;
        }
        & + .btn {
          margin-left: 60px;
        }
      }
    }
  }
}
</style>
