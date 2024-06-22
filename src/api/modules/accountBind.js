import http from '@/api/http'

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 获取绑定信息
export const getAccountBindDetailApi = () => {
  return http.get(`${Base_Url}/h5/my-card`)
}

// 修改绑定信息
export const modifyAccountBindApi = (params) => {
  return http.post(`${Base_Url}/h5/bind-card`, params)
}