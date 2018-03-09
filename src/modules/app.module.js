/**
 * 基础通用module
 * 管理用户信息，登录、注册等功能
 * **/
import server from '../util/fetch';
import { masterName } from '../config';
const App = {
  namespaced: true,
  state: {
    userinfo: null,
    blogList: [], // 所有文章列表
    detailURL: null,    // 当前选中的文章URL信息
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
              const msg = await server(`https://api.github.com/repos/${masterName}/${masterName}.github.io/contents/blog`,null,'GET');
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
      /** 获取某个文章的详细内容 **/
      async getBlogDetail(context, payload) {
        try{
            const url = `https://raw.githubusercontent.com/${masterName}/${masterName}.github.io/master/blog/${payload.url}`;
            const msg = await server(url, null, 'GET');
            return msg;
        } catch(e) {
            console.log("网络错误");
        }
      },
      /** 点选某篇文章时，保存该文章的URL信息，供详情页获取数据使用 **/
      async saveDetailNow(context, payload) {
          try{
              context.commit({
                  type: 'setDetailURL',
                  data: payload.data,
              });
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
      setDetailURL(state, payload) {
        state.detailURL = payload.data;
      },
    clearUserinfo(state) {
      state.userinfo = null;
    }
  }
};

export default App;
