import http from '@/api/http';

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 获取团队列表
export const getTeamListApi = (params) => {
  return http.get(`${Base_Url}/h5/team-list`, params);
}