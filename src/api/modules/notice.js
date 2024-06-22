import http from '@/api/http';

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 获取新手教程
export const getGuideBookApi = () => {
  return http.get(`${Base_Url}/system/notice/1802926412858966018`)
}