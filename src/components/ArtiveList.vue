<template>
    <li class="artive-list">
        <div class="line"></div>
        <div>
            <div>{{ thisData.title || '--' }}</div>
            <div>{{ thisData.time || '--' }}</div>
            <div>{{ thisData.info || '--' }}</div>
            <div>Read More</div>
        </div>
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

</style>
