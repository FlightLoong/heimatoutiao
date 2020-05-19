<template>
  <div class="my-container">
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg"/>
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <van-button class="btn" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">8</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">8</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">8</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">8</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- 导航区域 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格组件 -->
    <van-cell title="消息通知" is-link to="index" />
    <van-cell class="mb-9" title="小智同学" is-link to="index"/>
    <van-cell class="logout-cell" title="退出登录" to="index"/>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style lang="scss" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 3px solid #fff;
        }

        .name {
          font-size: 30px;
          color: #fff;
        }
      }

      .right {
        .btn {
          width: 150px;
          border-radius: 20px;
          font-size: 16px;
          height: 44px;
          line-height: 44px;
        }
      }
    }

    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 140px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }

      .toutiao-lishi {
        color: #ff9f1d;
      }

      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
