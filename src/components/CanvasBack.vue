<template>
    <canvas class="canvas-back">

    </canvas>
</template>

<script>
    import ImgMenuBack from '../assets/menu_back.png';
export default {
  name: "Header",
  data: function() {
    return {
      ctx: null,
      width: 0, // canvas当前的宽及像素
      height: 0, // canvas当前的高及像素
      theRain: [], // 所有的雨
        ImgMenuBack,
    };
  },
  mounted() {
    console.log("得到了啊：", this.$el);
    this.ctx = this.$el.getContext("2d");
    this.width = this.$el.clientWidth;
    this.height = this.$el.clientHeight;
    this.$el.width = this.width;
    this.$el.height = this.height;
    this.ctx.fillStyle = "transparent";
    this.ctx.lineCap = "round";
    window.addEventListener("resize", this.resize, false);
    this.init(300);
    this.animate();
  },
  methods: {
    init(many) {
      /**
       * 总共分5层，近大远小，越远越模糊，越慢
       * 由远即近绘制
       * */
      for (let i = 0; i < many; i++) {
        let params = null;
        const rgb = Math.round(this.random(20, 80));
        if (i < many / 5) {
          params = {
            h: 80,
            w: 1,
            s: this.random(10,12),
            color: `rgba(${rgb}, ${rgb}, ${rgb}, 0.4)`,
          };
        } else if (i < many / 4) {
          params = {
            h: 100,
            w: 1,
              s: this.random(12,14),
            color: `rgba(${rgb}, ${rgb}, ${rgb}, 0.5)`,
          };
        } else if (i < many / 3) {
          params = {
            h: 120,
            w: 1,
              s: this.random(14,16),
            color: `rgba(${rgb}, ${rgb}, ${rgb}, 0.6)`,
          };
        } else if (i < many / 2) {
          params = {
            h: 140,
            w: 1,
              s: this.random(16,18),
            color: `rgba(${rgb}, ${rgb}, ${rgb}, 0.7)`,
          };
        } else {
          params = {
            h: 200,
            w: 2,
              s: this.random(18,20),
            color: `rgba(${rgb}, ${rgb}, ${rgb}, 0.8)`,
          };
        }
        const temp = {
          x: this.random(-10, this.width + 10), // 当前起始点坐标X
          y: this.random(-1000, this.height + 1000), // 当前起始点坐标Y
          deg: this.random(-2, 5), // 斜率，偏移多少度
          h: params.h, // 雨丝的长度
          w: params.w, // 雨丝的宽度
          color: params.color, // 雨丝颜色
          s: params.s // 雨移动速度
        };
        this.theRain.push(temp);
      }
    },
    random(min, max) {
      // 取范围随机数
      return Math.random() * (max - min) + min;
    },
    resize() {
      // windows大小被改变时重新设置canvas宽高
      console.log("被调用resize");
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
      this.$el.width = this.width;
      this.$el.height = this.height;
    },
    drow() {
      const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
      for (let i = 0; i < this.theRain.length; i++) {
        const t = this.theRain[i];
        const deg = Math.PI / 180 * t.deg;
        if (Math.abs(t.y) > this.height) {
          t.x = this.random(-10, this.width + 10);
          t.y = -t.h;
        } else {
          t.x = Math.sin(deg) * t.s + t.x;
          t.y = Math.cos(deg) * t.s + t.y;
        }

        ctx.strokeStyle = t.color;
        ctx.lineWidth = t.w;
        ctx.beginPath();
        ctx.moveTo(t.x, t.y);

        ctx.lineTo(Math.sin(deg) * t.h + t.x, Math.cos(deg) * t.h + t.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    animate() {
      this.drow();
      requestAnimationFrame(this.animate);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style scoped lang="less">
.canvas-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
