import http from '@/api/http';

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 获取交易大厅数据
export const rechargeApi = (params) => {
  return http.post(`${Base_Url}/h5/recharge`, params)
}