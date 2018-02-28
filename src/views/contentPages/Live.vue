<template>
    <ul class="live">
        <ArtiveList v-for="{v, index} in listData.article" :thisData="v" :key="index"></ArtiveList>
    </ul>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import ArtiveList from '../../components/ArtiveList.vue';
    import listData from '../../util/data';
    export default {
        name: "live",
        data: function() {
            return {
                username: "",
                password: "",
                listData,
            };
        },
        components: {
            ArtiveList,
        },
        methods: {
            onLogin() {
                this.$store
                    .dispatch({
                        type: "app/onLogin",
                        params: { username: this.username, password: this.password }
                    })
                    .then(res => {
                        console.log("能返回么：", res);
                    });
            }
        },
        mounted() {
          console.log('取到值了吗：', this.allData);
        },
        computed: {
            allData() { return this.listData.article },
        }
    };
</script>
