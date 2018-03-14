const d = [
  /**
   * 所有的文章相关信息，保存了
   * 因为gitAPI返回的信息中没办法带这些内容
   * 所以存在这里，根据gitName来取
   * **/
  {
    gitname: "markdown.md",
    type: 1, // 分类 1文章，2作品，3日志
    title: "MarkDown语法教程", // 标题
    tags: ["文章", "JS"], // 标签
    pic: null, // 摘要配图
    info: `从别处搬运的，记录于此，有时候自己也可以看看`, // 摘要
    date: "2018/02/28" // 时间
  },
  {
    gitname: "a.md",
    type: 3,
    title: "Hello World 文章测试",
    tags: ["个人日志"],
    pic: 'http://isluo.com:8080/files/work/gd1.jpg',
    info: `发一篇测试文章试一试`,
    date: "2018/03/10"
  }
];

export default d;
