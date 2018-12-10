# VUE BLOG
* 我自己的博客模版源代码
* vue-cli 3.0 构建
* github API 评论留言功能（使用的gitalk）

## 构建
```
yarn install  // 引入包
yarn serve    // 开发环境启动：localhost:8080
yarn build    // 生产环境最终打包
```
## 需修改的地方

* src/config.js
  masterName: 你的github的用户名，比如我的：javaLuo
  issueName: 你的用来存放issue评论的项目,比如我的：javaimluo
  client_id: github APPlication 授权申请的client_id
  client_secret: github APPlication 授权申请的client_secret
  
 如果还没有GitHub Application 可<a href="https://github.com/settings/applications/new" target="_blank">点击这里申请</a>，Authorization callback URL 填写当前使用插件页面的域名，比如我的：blog.isluo.com
