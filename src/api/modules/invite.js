import http from '@/api/http'

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 获取我的邀请码
export const getInviteCodeApi = () => {
  return http.get(`${Base_Url}/h5/invite-code`);
}