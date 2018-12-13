import request from '@/utils/request'
import auth from '@/utils/apiAuth'
// import admin from '@/utils/apiAdmin'
export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: auth + '/login.json',
    method: 'post',
    data
  })
}
