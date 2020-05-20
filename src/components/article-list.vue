<template>
  <div>
    <div class="article-list">
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'

export default {
  name: 'ArticleList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: '',
      error: false
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
        console.log(results)
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
        console.log(data)
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
