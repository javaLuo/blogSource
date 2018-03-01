<template>
    <li class="artive-list">
        <div class="title"><router-link to="/">{{ thisData.title || '--' }}</router-link></div>
        <div class="time">{{ thisData.time || '--' }}</div>
        <div class="info"><span v-html="thisData.info"></span></div>
        <div class="read-more"><router-link to="/">Read More</router-link></div>
    </li>
</template>

<script>
    export default {
        name: "ArtiveList",
        data: function() {
            return {

            }
        },
        beforeMount() {
          console.log('数据是什么：', this.thisData);
        },
        props: {
            thisData: Object,
        }
    };
</script>

<style scoped lang="less">
    .artive-list{
        width: 100%;
        box-sizing: border-box;
        border-left: solid 5px #D3D3D3;
        padding: 4px 8px;
        &+li{
            margin-top: 32px;
        }
        .title{
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
            a{
                color: #222;
                transition: all .2s;
                &:hover{
                    color: #30634c;
                }
            }
        }
        .time{
            color: #888;
            margin-bottom: 8px;
        }
        .info{
            color: #888;
            font-size: 14px;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        .read-more{
            font-size: 16px;
            a{
                color: #30634c;
                letter-spacing: 1px;
                font-style: italic;
                transition: all .2s;
                &:hover{
                    color: #0ACB79;
                }
            }
        }
    }
</style>
