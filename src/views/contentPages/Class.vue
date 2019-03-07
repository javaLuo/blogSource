<template>
  <div class="class-box">
    <div class="bread">
      <i class="el-icon-location"></i>
      <Breadcrumb>
        <BreadcrumbItem>标签分类</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <ul>
      <li class="tag-box" v-for="(item, index) in allTags" :key="`f${index}`">
        <div class="tag-title">{{ item }}</div>
        <ul class="tag-list">
          <li
            v-for="(item2, index2) in checkTags(item)"
            @click="onLinkClick(item2.gitname)"
            :key="index2"
          >
            {{ item2.title }}
          </li>
        </ul>
      </li>
    </ul>
    <MyLoading :show="!blogConfig" />
  </div>
</template>

<script>
/** 文章列表页 **/
import { mapState } from "vuex";
import { Breadcrumb, BreadcrumbItem } from "element-ui";
import { sortDate } from "../../util/tools";
import ImgLoading from "../../assets/loading.gif";
import MyLoading from "../../components/MyLoading";
export default {
  name: "class",
  data: function() {
    return {
      ImgLoading,
      pageNow: 1,
      pageSize: 12,
      total: 0,
      pageNowData: []
    };
  },
  components: {
    Breadcrumb,
    BreadcrumbItem,
    MyLoading
  },
  computed: {
    ...mapState({
      blogConfig: state => state.app.blogConfig,
      listData(state) {
        if (!state.app.blogConfig) {
          this.total = 0;
          return [];
        }
        this.total = state.app.blogList.length;
        return sortDate(state.app.blogList, state.app.blogConfig.d);
      },
      allTags(state) {
        if (!state.app.blogConfig) {
          return [];
        }
        let tags = new Set();
        state.app.blogConfig.d.forEach(item => {
          item.tags.forEach(item2 => {
            tags.add(this.firstUpperCase(item2));
          });
        });

        return Array.from(tags).sort();
      }
    })
  },
  methods: {
    // 首字母大写
    firstUpperCase(str) {
      return str.toLowerCase().replace(/(^|\s)[a-z]/g, function(s) {
        return s.toUpperCase();
      });
    },
    // 筛选文章中指定tag的文章
    checkTags(tag) {
      if (!this.blogConfig) {
        return [];
      }
      return this.blogConfig.d.filter(item => {
        for (let i = 0; i < item.tags.length; i++) {
          if (item.tags[i].toUpperCase() === tag.toUpperCase()) {
            return true;
          }
        }
        return false;
      });
    },
    // 跳转到详情
    onLinkClick(file) {
      this.$router.push(`/detail/${file}`);
    }
  }
};
</script>

<style scoped lang="less">
.class-box {
  .bread {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    i {
      margin-right: 8px;
      margin-left: -5px;
      color: #0acb79;
    }
  }
  .nothing {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
    color: #888;
    div {
      margin-top: 8px;
    }
  }

  .tag-box {
    list-style: none;
    margin-bottom: 20px;
    .tag-title {
      font-size: 22px;
      margin-bottom: 5px;
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      color: #444;
      & > li {
        cursor: pointer;
        list-style: none;
        flex: none;
        box-sizing: border-box;
        width: 33.33%;
        min-width: 150px;
        padding: 20px;
        margin: 0;
        background-color: #f8f8f8;
        transition: all 300ms;
        word-break: break-all;
        word-wrap: break-word;
        &:nth-child(even) {
          background-color: #f0f0f0;
        }
        &:hover {
          color: #108ee9;
        }
      }
    }
  }
}
</style>
