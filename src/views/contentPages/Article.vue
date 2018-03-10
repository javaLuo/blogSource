<template>
    <div class="article-box">
        <ul class="live" @mousewheel="onMousewheel" @DOMMouseScroll="onMousewheel" @touchmove="onMousewheel">
            <ArtiveList class="swiper-slide" v-for="(v, index) in pageNowData" :thisData="v" :key="index"></ArtiveList>
        </ul>
        <div class="pagin">
            <Pagination
                    :total="total"
                    :current-page="pageNow"
                    layout="total, prev, pager, next, jumper"
                    @current-change="onPageChange"
            ></Pagination>
        </div>
    </div>
</template>

<script>
    /** 日志列表页 **/
    import { mapState } from "vuex";
    import { Pagination } from 'element-ui';
    import ArtiveList from "../../components/ArtiveList.vue";
    import { getBlogInfo } from '../../util/tools';
    export default {
        name: "article",
        data: function() {
            return {
                pageNow: 1,
                pageSize: 10,
                total: 0,
            };
        },
        components: {
            ArtiveList,
            Pagination,
        },
        mounted() {
            this.total = this.listData.length;
        },
        computed: {
            ...mapState({
                listData: state => state.app.blogList.filter((item) => getBlogInfo(item.name).type === 3),
            }),
            pageNowData() {
                return this.listData.filter((item, index) => index >= (this.pageNow - 1) * 10 && index < this.pageNow * 10 );
            },
        },
        watch: {
            listData(newV, oldV) {
                this.total = newV.length;
            }
        },
        methods: {
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
            /** 页码改变时触发 **/
            onPageChange(v) {
                console.log('触发：', v);
                this.pageNow = v;
            }
        }
    };
</script>

<style scoped lang="less">
    .article-box{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height :100vh;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 32px;
        .live {
            display: block;
            width: 100%;
            flex: auto;
        }
        .pagin{
            flex: none;
        }
    }
</style>
