<template>
  <div class="about">
      <h1>登录</h1>
      <input type="text" name="username" v-model="username"/>
      <input type="password" name="password" v-model="password"/>
      <br/>
      <button v-on:click="onLogin">提交</button>
      <br/>
      <div>用户名：{{ userinfo.username }}</div>
      <div>密码：{{ userinfo.password }}</div>
      <router-link :to="{path: '/', params: { userId: 123 }}">Home</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "loginPage",
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
