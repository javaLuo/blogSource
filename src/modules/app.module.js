/**
 * 基础通用module
 * 管理用户信息，登录、注册等功能
 * **/
import server from "../util/fetch";
import { masterName, blogs } from "../config";
import { Message } from "element-ui";
const App = {
  namespaced: true,
  state: {
    userinfo: null,
    blogList: [], // 所有文章列表
    blogs: [], // 文章内容缓存
    blogConfig: blogs, // 文章配置信息缓存
    detailURL: null, // 当前选中的文章URL信息
    photoList: [], // 所有照片
    photoShow: false, // 照片模态框是否显示
    photoGroupChose: "", // 当前选中哪一个相册
    photoGroup: [], // 相册所有分组
    photoWhich: 0, // 当前点选的哪一张相片
    hi: {
      // 一言
      hitokoto: "Loading..."
    }
  },
  actions: {
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
        Message.info("列表获取失败，需要翻墙");
      }
    },
    /** 获取所有照片列表 **/
    async getPhotoList(context) {
      try {
        const msg = await server(
          `https://api.github.com/repos/${masterName}/${masterName}.github.io/contents/photo`,
          null,
          "GET"
        );
        if (msg.status === 200 || msg.status === 304) {
          let g = new Set();
          msg.data.forEach(item => {
            const n = item.name.split("|");
            g.add(n[0]);
          });
          g = Array.from(g);
          context.commit({
            type: "setPhotoList",
            data: msg.data,
            photoGroup: g,
            photoGroupChose: g[0]
          });
        }
        return msg;
      } catch (e) {
        Message.info("照片获取失败，需要翻墙");
      }
    },
    /** 获取某个文章的详细内容 **/
    async getBlogDetail(context, payload) {
      console.log("id:", payload);
      try {
        await new Promise((res, rej) => {
          const dom = document.createElement("script");
          dom.src = `/public/blogs/${payload.id}`;
          dom.onload = () => {
            res(payload.id);
          };
          dom.onerror = () => {
            rej(payload.id);
          };
          document.body.appendChild(dom);
        });
      } catch (e) {
        Message.info("文章获取失败，需要翻墙");
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
        const url = `https://international.v1.hitokoto.cn?c=d&time=${Date.now()}`;
        const msg = await server(url, null, "GET", false, true);
        if (msg.status === 200 || msg.status === 304) {
          context.commit({
            type: "setHi",
            data: msg.data
          });
        }
        return msg;
      } catch (e) {
        Message.info("一言获取失败，需要翻墙");
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
    },
    // 保存照片列表
    setPhotoList(state, payload) {
      state.photoList = payload.data;
      state.photoGroup = payload.photoGroup;
      if (!state.photoGroupChose) {
        state.photoGroupChose = payload.photoGroupChose;
      }
    },
    // 设置当前选择的相册
    setPhotoChose(state, payload) {
      state.photoGroupChose = payload.value;
    },
    // 设置相册模态框是否显示
    setPhotoShow(state, payload) {
      state.photoShow = payload.show;
      if (payload.show) {
        state.photoWhich = payload.which;
      }
    }
  }
};

export default App;
