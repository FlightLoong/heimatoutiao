/**
 * 频道请求模块
 */
import request from '@/utils/request'

/**
 * 获取频道列表
 */
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
