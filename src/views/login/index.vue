<template>
  <div class="login-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field autocomplete v-model="username" placeholder="请输入用户名">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field autocomplete v-model="password" placeholder="请输入验证码" type="password">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap" style="margin: 16px;">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 表单提交事件
    onSubmit () {}
  }
}
</script>

<style scoped lang="scss">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 60px;
    line-height: 60px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 10px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
