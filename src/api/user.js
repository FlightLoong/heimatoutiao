/**
 * 用户相关请求模块
 */

import request from '@/utils/request'
import store from '@/store'

/**
 * 发起登录请求
 * @param { 用户信息 } data
 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 获取验证码
 * @param { 手机号 } mobile
 *
 * 注意： 每个手机号每分钟只能发送 1 次
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户信息
 * @param { }
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
