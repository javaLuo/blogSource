<template>
    <div class="article">
    Article
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "article",
  data: function() {
    return {
      username: "",
      password: ""
    };
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
  computed: {
    ...mapState({
      userinfo: state => state.app.userinfo || {}
    })
  }
};
</script>
