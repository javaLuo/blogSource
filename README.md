# blogSource
我自己的gitHub博客源代码

- vue-cli全家桶
- GitHub api获取博客
- github api添加评论

---
##使用说明

###1. 注册 OAuth Application
    
- <a href="https://github.com/settings/applications/new" target="_blank">点击此处</a> 来注册一个新的 OAuth Application。其他内容可以随意填写，
但要确保填入正确的 callback URL（就是你网站的域名，比如我的： http://blog.isluo.com）。
- 你会得到一个 client ID 和一个 client secret，这个将被用于之后的用户登录。

###2. 克隆本项目到本地

###3. yarn install 或 npm install

###4. 修改src/config/index.js中的内容
```
export const masterName = "javaLuo";  // 这里改为你自己的GitHub账户名
export const issueName = "javaimluo"; // 这里改为你自己的某个项目的名字(你需要另外一个项目用来作为所有评论的存储仓库)
export const client_id = "xxxxx";     // 第1步中得到的client_id，用于gitment登录
export const client_secret = "xxxxx"; // 第1步中得到的client_secret，用于gitment登录

```

###5、然后修改项目中你想修改的任何地方（照片、标题、样式等）

###6、npm run serve 可启动开发环境：http://localhost:8080

###7、npm run build 可将代码打包到dist文件夹下

###8、开通你自己的github博客服务

- 在github上创建一个以你的账户名为前缀的项目，比如我的账户名是javaLuo,则创建的项目名为javaLuo.github.io
- 几分钟后GitHub会自动帮你开通网站，访问javaLuo.github.io将打开此项目根目录下的index.html

###9、上传代码
- 把第7步生成的dist文件夹中的东西push到第8步创建的github博客项目中，大功告成。

###10、自定义域名
- 如果你有自己的域名，比如我自己的blog.isluo.com。那可以在博客项目的根目录创建一个名为CNAME的无后缀文件
- 里面的内容就写你的域名即可

---

##写博客

- 需要在你的github博客项目根目录创建一个名为blog的文件夹
- 在此文件夹下新建博客文件吧，比如hello.md
- 在hello.md中书写你的博客内容
- 在你的github博客项目根目录下创建一个名为config的文件夹
- 在config文件夹下创建config.json文件
- 在config.json中写：
```
{
    "d": [
        {
            "gitname": "hello.md",  // 对应你床架难道.md文件名字
            "type": 1,              //1文章，2作品，3日志
            "title": "文章标题",    // 文章的大标题
            "tags": ["文章标签1","文章标签2"],  // 文章的所有标签，没有就写null或[]
            "pic": "http://xxx.com/xx.jpg",     // 文章的封面图片，没有就写null
            "info": "文章简介",                 // 文章的简介提要
            "date": "2018/03/28"                // 文章的发表日期
        },
    ]
}

```
> 以后发表新文章，都需要同时更新这个config.json的内容，因为github api使用的是V3，获取文章列表只能获取到.md文件名，而又不想把所有信息都包含在文件名中（那就太长了），所以采用了这种方式

- 最后push到github上，就OK了