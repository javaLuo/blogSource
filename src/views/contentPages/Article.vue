<template>
    <div class="article">
    Article
    </div>
</template>

<script>
/** 文章列表 */
import { mapState, mapGetters } from "vuex";
export default {
  name: "article",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {},
  computed: {
    ...mapState({
      userinfo: state => state.app.userinfo || {}
    })
  }
};
</script>
