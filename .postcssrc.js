/**
 * postcss 配置文件
 */

module.exports = {
  // 配置 PostCss 相关的插件
  plugins: {
    // 配置使用 autoprefixer 插件，给 css 样式添加私有前缀
    // vue-cli 内部已经配置好了 autoprefixer，
    // 在这里属于重复配置，冲突了，所以在运行命令时终端会报警告信息
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    'postcss-pxtorem': {
      // lib-flexible 的 REM 适配方法，是将设计稿分为 10 份，没分占据  1/10
      // 因此 rootValue 应该设置为设计稿的 1/10
      // 在移动端开发中，设计稿通常是 750，所以 rootValue 应该为 75
      // 但是 vant 建议为 37.5，因为 vant 是基于 375 的设计稿尺寸开发的，所以必须设置为 37.5
      // 这样就导致我们设计稿的尺寸都必须 / 2
      // 解决方法：
      // 如果是 Vant 的样式，基于 37.5 来转换
      // 如果是 自己 的样式，基于 75 来转换

      // rootValue 可以设置两种类型
      // 1. 数字，即固定的基准值
      // 2. 函数，动态返回基准值
      // postcss-pxtorem 对每个 css 文件处理的时候，都会执行调用这个函数，
      // 把被处理的 CSS 文件相关的信息通过参数传递给该函数
      // rootValue: 37.5,

      rootValue ({ file }) {
        // console.log(obj)
        // console.log(file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
