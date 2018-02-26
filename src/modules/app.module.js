/**
 * 基础通用module
 * 管理用户信息，登录、注册等功能
 * **/
const App = {
  namespaced: true,
  state: {
    userinfo: null
  },
  actions: {
    async onLogin(context, payload) {
      console.log("触发登录:", payload.params);
      try {
        const msg = await new Promise((res, rej) => {
          setTimeout(() => {
            res({
              status: 200,
              message: "success",
              data: { id: 1, username: "admin", password: "123123" }
            });
          }, 1000);
        });
        console.log("返回结果：", msg, context);
        if (msg.status === 200) {
          context.commit({
            type: "setUserinfo",
            userinfo: msg.data
          });
          console.log("登录成功");
          return msg;
        }
      } catch (e) {
        console.log("网络错误");
      }
    }
  },
  mutations: {
    setUserinfo(state, payload) {
      console.log("触发保存用户信息：", state, payload);
      state.userinfo = payload.userinfo;
    },
    clearUserinfo(state) {
      state.userinfo = null;
    }
  }
};

export default App;
