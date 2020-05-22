<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item class="channel-item" v-for="(item, index) in userChannels" :key="index">
        <div slot="text" class="text-wrap">
          <span :class="{ active: index === activeIndex }">{{ item.name }}</span>
        </div>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="value in 8" :key="value" icon="plus" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.channel-edit {
  .channel-item {
    height: 86px;

    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
    }

    .text-wrap {
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #222;

      .active {
        color: red;
      }
    }
  }
}

/deep/ .recommend-grid {
  .grid-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0px;
      }
    }
  }
}
</style>
