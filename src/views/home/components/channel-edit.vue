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
      <!-- <van-grid-item class="grid-item" v-for="channel in recommendChannels" :key="channel.id" icon="plus" :text="channel.name" /> -->
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        @click="onAddChannel(channel)"
      >
        <div class="text-wrap" slot="text">
          <van-icon name="plus"></van-icon>
          <span>{{channel.name}}</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: []
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(item => {
        return (
          this.userChannels.findIndex(userItem => {
            return userItem.id === item.id
          }) === -1
        )
      })
    }
  },
  methods: {
    // 获取所有频道的数据
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        data.data.channels.forEach(item => {
          item.name = item.name.substring(0, 6)
        })
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取所有频道数据失败')
      }
    },

    onAddChannel(channel) {
      this.userChannels.push(channel)
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
  }

  .text-wrap {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #222;

    .active {
      color: red;
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
