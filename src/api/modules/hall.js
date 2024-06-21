import http from '@/api/http';

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// pc端固定客户端授权id
const clientId = import.meta.env.VITE_APP_CLIENT_ID;

// 获取交易大厅数据
export const getHallApi = (params) => {
  return http.get(`${Base_Url}/h5/floor-order`, params)
}

// 卖出订单
export const saleApi = (params) => {
  return http.post(`${Base_Url}/h5/sold`, params)
}