import http from '@/api/http'

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 更新头像信息
export function updateProfileApi(params) {
  return http.put(`${Base_Url}/system/user/profile/id-card`, params)
}