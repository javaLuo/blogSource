/**
 * 基础通用module
 * 管理用户信息，登录、注册等功能
 * **/
import server from '../util/fetch';
import ShowDown from 'showdown';
const App = {
  namespaced: true,
  state: {
    userinfo: null,
    blogList: [], // 所有文章列表
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
    },
      /** 获取所有文章列表 **/
      async getBlogList(context, payload) {
          try{
              const msg = await server('https://api.github.com/repos/javaLuo/javaLuo.github.io/contents/blog',null,'GET');
              if(msg.status === 200 || msg.status === 304) {
                  context.commit({
                      type: 'setBlogList',
                      data: msg.data,
                  });
              }
              return msg;
          } catch(e) {
              console.log("网络错误");
          }
      },
      async onTest(context, payload) {
        console.log('传来了什么：', payload);
        try{
            const msg = await server('https://raw.githubusercontent.com/javaLuo/javaLuo.github.io/master/blog/Hello World.md',null,'GET');
            console.log('开始解析：：', msg);
            const converter = new ShowDown.Converter();
            if(msg.status === 200 || msg.status === 304) {
                const h = converter.makeHtml(msg.data);
                console.log('解析成了什么：', h);
            }
            console.log('得到了什么：', msg);
            return msg;
        } catch(e) {
            console.log("网络错误");
        }
      }
  },
  mutations: {
      setBlogList(state, payload) {
          console.log('触发这个mutaions:', payload);
          state.blogList = payload.data;
      },
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
