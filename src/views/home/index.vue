<template>
  <div class="home-container">
    <!-- 导航栏区域 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <div class="logo" slot="left"></div>
      <van-button size="small" slot="right" icon="search" type="info" round>搜索</van-button>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <div class="article-scroll-wrap" ref="article-scroll-wrap">
      <van-tabs v-model="active" @change="onTabChange" animated swipeable>
        <van-tab v-for="item in channels" :title="item.name" :key="item.id">
          <article-list :channel="item"></article-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
// 导入组件
import ArticleList from '@/components/article-list.vue'
// 导入 lodash 方法
import { debounce } from 'lodash'

export default {
  name: 'HomeIndex',
  data() {
    return {
      // 被激活的标签页
      active: 0,
      // 文章评论列表
      channels: []
    }
  },
  created() {
    this.loadChannels()
  },
  computed: {
    articleScrollWrap() {
      return this.$refs['article-scroll-wrap']
    }
  },
  mounted() {
    const articleScrollWrap = this.articleScrollWrap
    articleScrollWrap.onscroll = debounce(() => {
      this.channels[this.active].scrollTop = articleScrollWrap.scrollTop
    }, 50)
  },
  methods: {
    // 获取文章频道列表的方法
    async loadChannels() {
      try {
        const { data } = await getChannels()
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('数据获取失败 ！')
      }
    },

    onTabChange() {
      const scrollTop = this.channels[this.active].scrollTop
      if (scrollTop) {
        this.$nextTick(() => {
          this.articleScrollWrap.scrollTop = scrollTop
        })
      }
    }
  },
  components: {
    ArticleList
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 180px;

  .page-nav-bar {
    .logo {
      width: 220px;
      height: 80px;
      background: url('./logo.png') no-repeat;
      background-size: contain;
    }

    .search-btn {
      background-color: #5babfb;
      width: 300px;
      border: none;

      .van-icon {
        color: #fff;
      }
    }
  }
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  left: 0;
  right: 0;
}

.article-scroll-wrap {
  height: 79vh;
  overflow-y: auto;
}
</style>
