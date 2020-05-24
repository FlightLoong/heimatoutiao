<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEditShow = !isEditShow"
      >{{ isEditShow ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in userChannels"
        :key="index"
        @click="onUserChannerClick(item, index)"
      >
        <div class="text-wrap">
          <span :class="{ active: index === activeIndex }">{{ item.name }}</span>
        </div>
        <van-icon v-show="isEditShow" name="clear" />
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
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel.js'
// 导入 vuex
import { mapState } from 'vuex'
// 导入本地存储的方法
import { setItem } from '@/utils/storage.js'

export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [],
      // 我的频道是否可编辑
      isEditShow: false
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
    ...mapState(['user']),
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

    async onAddChannel(channel) {
      try {
        this.userChannels.push(channel)
        if (this.user) {
          await addUserChannel([
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ])
        } else {
          setItem('channels', this.userChannels)
        }
      } catch (error) {
        this.$toast('添加频道失败')
      }
    },

    // 切换频道
    onUserChannerClick(item, index) {
      if (this.isEditShow) {
        if (item.name === '推荐') {
          return
        }
        if (index <= this.activeIndex) {
          this.$emit('update:active-index', this.activeIndex - 1)
        }
        // 编辑状态时执行删除操作
        this.userChannels.splice(index, 1)
        this.deleteChannel(item)
      } else {
        // 非编辑状态
        this.$emit('update:active-index', index)
        this.$emit('close-popup')
      }
    },

    // 删除频道
    async deleteChannel(item) {
      try {
        if (this.user) {
          // 已登录
          await deleteUserChannel(item.id)
        } else {
          setItem('channels', this.userChannels)
        }
      } catch (error) {
        console.log(error)
        this.$toast('删除频道失败，请稍后重试')
      }
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

  .van-icon-clear {
    position: absolute;
    right: -10px;
    top: -10px;
    color: #cacaca;
    font-size: 36px;
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
