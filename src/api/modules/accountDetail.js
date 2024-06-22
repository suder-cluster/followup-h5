import http from '@/api/http'

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 获取绑定信息
export const getAccountDetailApi = (params) => {
  return http.get(`${Base_Url}/h5/my-water`, params)
}