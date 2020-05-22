<template>
  <div>
    <div class="article-list">
      <van-pull-refresh
        success-duration="1500"
        v-model="isRefreshLoading"
        @refresh="onRefresh"
        :success-text="successText"
      >
        <van-list
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article-item  v-for="(item, index) in list" :key="index" :item="item"></article-item>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import ArticleItem from '@/components/article-item.vue'

export default {
  name: 'ArticleList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: '',
      error: false,
      isRefreshLoading: false,
      successText: ''
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {
    async onLoad() {
      try {
        // 1. 获取文章数据
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // 2. 将数据添加大 list 数组中
        const { results } = data.data
        // console.log(results)
        this.list.push(...results)

        // 3. 加载状态结束
        this.loading = false

        // 4. 判断数据是否加载结束
        if (results.length) {
          // 获取到更新下一页的时间戳
          this.timestamp = results.pre_timestamp
        } else {
          // 如果数据请求完成，将加载状态设置为 true，不在触发上拉加载
          this.finished = true
        }
        // console.log(data)
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },

    async onRefresh() {
      try {
        // 1. 获取文章数据
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })

        // 2. 将数据刷新追加到顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false

        // 4. 提示刷新成功
        this.successText = `刷新成功，更新了 ${results.length} 条`
      } catch (error) {
        this.$toast('刷新失败')
        this.isRefreshLoading = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="scss" scoped>
</style>
