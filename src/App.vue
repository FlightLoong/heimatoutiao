<template>
  <div id="app">
    <!-- 路由的出口 -->
    <keep-alive :include="cachePages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      cachePages: ['TabBar']
    }
  }
}
</script>

<style lang="scss">
.box {
  width: 750px;
  height: 64px;
  background-color: pink;
}
</style>
