<template>
  <div id="home" class="home swiper-container">
      <Header :pageNow="pageNow"/>
      <div class="swiper-wrapper">
          <div class="swiper-slide swiper-no-swiping"><Page1 :pageNow="pageNow"/></div>
          <div class="swiper-slide swiper-no-swiping"><Page2 :pageNow="pageNow"/></div>
      </div>
      <div class="footer">Slide 3</div>
  </div>
</template>

<script>
    import Swiper from 'swiper';
    import Page1 from './homePages/Page1.vue';
    import Page2 from './homePages/Page2.vue';
    import Header from '../components/Header.vue';
export default {
  name: "home",
    data: function(){
        return {
            scrollDom: null,
            pageNow: 0,
        }
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
        Page2,
    },
    methods: {
        initScroll() {
            this.scrollDom = new Swiper(".swiper-container", {
                direction: 'vertical',
                // slidesPerView: 'auto',
                slidesOffsetAfter: 300,
                mousewheel: true,
                speed: 1000,
                noSwiping: false,
                on: {
                    slideChangeTransitionStart: () => {
                        console.log(this.scrollDom.activeIndex);
                        this.pageNow = this.scrollDom.activeIndex;
                    },
                }
            });
        }
    }

};
</script>

<style scoped lang="less">
    .home{
        height: 100vh;
        min-height: 400px;
        overflow: hidden;
        background-color: #222;
        .swiper-wrapper{
            display:block;
            height: 100%;
            transition-timing-function: cubic-bezier(1, 0.01, 0.01, 1);
            .swiper-slide{
                display: block;
                width: 100%;
                height: 100%;
                background-color: #fff;
            }
        }
    }
    .footer{
        height: 300px;
        background-color: #f00;
    }
</style>