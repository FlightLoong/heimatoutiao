<template>
  <div class="layout-container">
    <!-- 子路由切换 -->
    <router-view/>
    <!-- 标签导航栏 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item icon="home-o" to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style lang="scss" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }

    span.text {
      font-size: 20px;
    }
  }
}
</style>
