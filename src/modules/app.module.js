/**
 * 基础通用module
 * 管理用户信息，登录、注册等功能
 * **/
import server from "../util/fetch";
import { masterName } from "../config";
// import { sortDate } from "../util/tools";
import { Message } from "element-ui";
const App = {
  namespaced: true,
  state: {
    userinfo: null,
    blogList: [], // 所有文章列表
    blogs: [], // 文章内容缓存
    blogConfig: null, // 文章配置信息缓存
    detailURL: null, // 当前选中的文章URL信息
    hi: {
      // 一言
      hitokoto: "hide in the city"
    }
  },
  actions: {
    /** 获取文章配置 **/
    async getBlogConfig(context) {
      try {
        const url = `https://raw.githubusercontent.com/${masterName}/${masterName}.github.io/master/config/config.json`;
        const msg = await server(url, null, "GET");
        if (msg.status === 200 || msg.status === 304) {
          context.commit({
            type: "saveTheBlogConfig",
            data: msg.data
          });
        }
        return msg;
      } catch (e) {
        Message.info("网络出现错误，配置获取失败");
      }
    },
    /** 获取所有文章列表 **/
    async getBlogList(context) {
      try {
        const msg = await server(
          `https://api.github.com/repos/${masterName}/${masterName}.github.io/contents/blog`,
          null,
          "GET"
        );
        // console.log("到这里了吗：", msg);
        if (msg.status === 200 || msg.status === 304) {
          // 给msg.data按照日期排序
          context.commit({
            type: "setBlogList",
            data: msg.data
          });
        }
        return msg;
      } catch (e) {
        Message.info("网络出现错误，列表获取失败");
      }
    },
    /** 获取某个文章的详细内容 **/
    async getBlogDetail(context, payload) {
      try {
        const url = `https://raw.githubusercontent.com/${masterName}/${masterName}.github.io/master/blog/${
          payload.url
        }`;
        const msg = await server(url, null, "GET", true);
        // console.log("为什么没有，什么意思：", msg);
        if (msg.status === 200 || msg.status === 304) {
          context.commit({
            type: "saveTheBlog",
            name: payload.url,
            data: msg.data
          });
        }
        return msg;
      } catch (e) {
        Message.info("网络出现错误，文章获取失败");
      }
    },
    /** 点选某篇文章时，保存该文章的URL信息，供详情页获取数据使用 **/
    async saveDetailNow(context, payload) {
      try {
        context.commit({
          type: "setDetailURL",
          data: payload.data
        });
      } catch (e) {
        // console.log("网络错误");
      }
    },
    /** 获取一言随机一条语句 **/
    async getHi(context) {
      try {
        const url = `https://v1.hitokoto.cn?c=c&time=${Date.now()}`;
        const msg = await server(url, null, "GET");
        if (msg.status === 200 || msg.status === 304) {
          context.commit({
            type: "setHi",
            data: msg.data
          });
        }
        return msg;
      } catch (e) {
        Message.info("网络出现错误，配置获取失败");
      }
    }
  },
  mutations: {
    setBlogList(state, payload) {
      // 保存文章列表
      state.blogList = payload.data;
    },
    setDetailURL(state, payload) {
      // 保存当前选择的BLOG地址
      state.detailURL = payload.data;
    },
    saveTheBlog(state, payload) {
      //  保存blog详细内容
      const lived = state.blogs.find(item => item.name === payload.name);
      if (!lived) {
        state.blogs.push({ name: payload.name, body: payload.data });
      }
    },
    saveTheBlogConfig(state, payload) {
      // 保存文章配置信息
      state.blogConfig = payload.data;
    },
    setHi(state, payload) {
      state.hi = payload.data;
    }
  }
};

export default App;
