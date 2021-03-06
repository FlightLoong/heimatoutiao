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
        <van-icon
          class="wap-nav"
          slot="nav-right"
          name="wap-nav"
          @click="isEditChannelShow = true"
        />
      </van-tabs>
    </div>

    <!-- 编辑区域 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :user-channels="channels"
        :active-index.sync="active"
        @close-popup="isEditChannelShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
// 导入组件
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
// 导入 lodash 方法
import { debounce } from 'lodash'
import { getItem } from '@/utils/storage.js'
// 导入 vuex 数据
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  data() {
    return {
      // 被激活的标签页
      active: 0,
      // 文章评论列表
      channels: [],
      // 弹出层状态
      isEditChannelShow: false
    }
  },
  created() {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user']),
    articleScrollWrap() {
      return this.$refs['article-scroll-wrap']
    }
  },
  watch: {
    // 监听用户登录状态
    user() {
      // 将频道初始化到激活状态
      this.active = 0
    }
  },
  mounted() {
    const articleScrollWrap = this.articleScrollWrap
    articleScrollWrap.onscroll = debounce(() => {
      this.channels[this.active].scrollTop = articleScrollWrap.scrollTop
    }, 50)
  },
  activated() {
    this.onTabChange()
    this.loadChannels()
  },
  methods: {
    // 获取文章频道列表的方法
    async loadChannels() {
      try {
        // const { data } = await getChannels()
        // this.channels = data.data.channels
        // 已经登录，获取线上数据
        let channels = []
        if (this.user) {
          const { data } = await getChannels()
          channels = data.data.channels
        } else {
          console.log('1')
          // 没有登录，获取本地数据使用
          const localChannels = getItem('channels')
          console.log(localChannels)
          if (localChannels) {
            channels = localChannels
          } else {
            // 如果本地没有数据，则请求默认的频道数据
            const { data } = await getChannels()
            channels = data.data.channels
          }
        }

        // console.log(channels)
        this.channels = channels
      } catch (error) {
        this.$toast('数据获取失败 ！')
      }
    },

    onTabChange() {
      const activeChannel = this.channels[this.active]
      if (!activeChannel) {
        return
      }
      const scrollTop = activeChannel.scrollTop
      if (scrollTop) {
        this.$nextTick(() => {
          this.articleScrollWrap.scrollTop = scrollTop
        })
      }
    }
  },
  components: {
    ArticleList,
    ChannelEdit
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

.edit-channel-popup {
  padding-top: 100px;
  box-sizing: border-box;
}

.wap-nav {
  position: fixed;
  right: 0;
  line-height: 80px;
  background-color: #fff;
  opacity: 0.8;
}
</style>
