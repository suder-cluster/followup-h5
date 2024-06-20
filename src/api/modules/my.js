import http from '@/api/http';

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 获取交易大厅数据
export const getInfoApi = (params) => {
  return http.get(`${Base_Url}/h5/my-info`, params)
}