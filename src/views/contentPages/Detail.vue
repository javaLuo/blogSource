<template>
    <div class="page-detail" @mousewheel="onMousewheel" @DOMMouseScroll="onMousewheel" @touchmove="onMousewheel">
        <div class="title">{{ comDetailInfo.title }}</div>
        <div class="date">{{ comDetailInfo.date }}</div>
        <div v-html="htmlData"></div>
    </div>
</template>

<script>
    /** 文章的详情页 **/
    import { mapState, mapGetters } from "vuex";
    import ShowDown from 'showdown';
    export default {
        name: "live",
        data: function() {
            return {
                sourceData: null,
            };
        },
        mounted() {
            console.log('router:', this.$route.params.id);
            this.getData(this.$route.params.id);
        },
        computed: {
            /** 原始数据转html代码 **/
            htmlData(){
                if(!this.sourceData){
                    return null;
                }
                const converter = new ShowDown.Converter();
                return converter.makeHtml(this.sourceData);
            },
            /** 解析出标题 **/
            comDetailInfo() {
                if (!this.$route.params.id){return '--';}
                const temp = this.$route.params.id.split('_');
                return {
                    title: temp[0],
                    date: temp[2],
                };
            },
            ...mapState({

            })
        },
        methods: {
            /** 处理滚动事件 **/
            onMousewheel(e) {
                const f = e.wheelDeltaY || -e.detail;
                const st = this.$el.scrollTop;
                const sh = this.$el.scrollHeight;
                const ch = this.$el.clientHeight;
                console.log("子级：", st, sh, ch, f);
                if ((f < 0 && st + ch !== sh) || (f > 0 && st !== 0)) {
                    e.stopPropagation();
                }
            },
            /** 通过标题向github请求文章详细内容 **/
            getData(id) {
                if (!id){
                    return null;
                }
                this.$store.dispatch({
                    type: 'app/getBlogDetail',
                    url: id,
                }).then((res) => {
                    if(res.status === 200) {
                         this.sourceData = res.data;
                    } else {

                    }
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .page-detail{
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        min-height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
        .title{
            padding-bottom: 24px;
            font-size: 32px;
            font-weight: bold;
        }
    }
</style>
