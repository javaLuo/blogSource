# VUE BLOG
* 我自己的github博客源代码
* vue-cli 3.0 构建
* github API 评论留言功能（使用的gitalk）

## 预览地址
<a href="https://blog.isluo.com" target="_blank">https://blog.isluo.com</a>
## 构建
```
yarn install  // 引入包
yarn serve    // 开发环境启动：localhost:8080
yarn build    // 生产环境最终打包
```
## 需修改的地方

* src/config.js<br/>
  masterName: 你的github的用户名，比如我的：javaLuo<br/>
  issueName: 你的用来存放issue评论的项目,比如我的：javaimluo<br/>
  client_id: github APPlication 授权申请的client_id<br/>
  client_secret: github APPlication 授权申请的client_secret<br/>
  
 如果还没有GitHub Application 可<a href="https://github.com/settings/applications/new" target="_blank">点击这里申请</a><br/>
 Authorization callback URL 填写当前使用插件页面的域名，比如我的：blog.isluo.com
 
