<template>
  <div>
    <van-cell class="article-item">
      <div class="title" slot="title">{{ item.title }}</div>
      <div class="label" slot="label">
        <!-- 3 个封面 -->
        <van-row gutter="20" v-if="item.cover.type === 3">
          <van-col span="8" v-for="(img, index) in item.cover.images" :key="index">
            <van-image
              slot="default"
              class="article-cover"
              :src="img"
              fit="cover"
              lazy-load
            />
          </van-col>
        </van-row>
        <!-- 文章其他信息 -->
        <div class="article-label">
          <span>{{ item.aut_name }}</span>
          <span>{{ item.comm_count }}</span>
          <span>{{ item.pubdate | relativeTime }}</span>
        </div>
      </div>
      <!-- 1 个封面 -->
      <van-image
        v-if="item.cover.type === 1"
        slot="default"
        class="article-cover"
        :src="item.cover.images[0]"
        fit="cover"
        lazy-load
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.article-item {
  .article-cover {
    width: 233px;
    height: 148px;
  }

  .article-label {
    span {
      margin-left: 20px;
    }
  }
}
</style>
