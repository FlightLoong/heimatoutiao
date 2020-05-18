<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view/>
    <h4>黑马头条移动端</h4>
    <div>
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.box {
  width: 750px;
  height: 64px;
  background-color: pink;
}
</style>
