<template>
  <div id="app" class="boss">
        <router-view/>
  </div>
</template>

<style lang="less">
    body{
        margin:0;
        padding:0;
        font-family:'Futura-Thin', '微软雅黑', sans-serif;
    }
    div,ul,li{position:relative;display:block;}			/* 全部都是相对定位 */
    ul{margin:0;padding:0;}								/* ul相当于div */
    li{list-style:none;margin:0;padding:0;}				/* li相当于div */
    img,span{vertical-align:middle;border:0;}
    input{line-height:normal;}
    input,textarea{-webkit-user-select:text;user-select:text;}/* 表单元素的文本可以被选择 */
    a:focus,a:hover,a:active{outline:none;}
    a{text-decoration:none;}
    button{cursor:pointer;padding:0 !important;}
    label{cursor:pointer;}
    sub,sup{font-size:75%;line-height: 0;position: relative;vertical-align: baseline;} /* 重新定义上标和下标的表现 */
    sup{top: -.5em;}
    sub{bottom: -.25em;}
    table{border-spacing: 0;border-collapse: collapse;} /* 边框合并为单一的边框 */
    td,th{padding: 0;}
    .all_nowarp{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .all_warp{word-break:break-all;word-wrap:break-word;} /* 强制换行 */
    .all_clear:after{content:".";height:0;visibility:hidden;display:block;clear:both;}
    .all_b{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}	/* 内框模式 */
    .all_trans1s{ transition:all 1s }
    .boss{
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        min-height: 100vh;
    }
</style>
