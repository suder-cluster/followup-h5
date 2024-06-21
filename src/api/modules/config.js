import http from '@/api/http'

const Base_Url = import.meta.env.VITE_APP_BASE_API;


//  查询参数接口
// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return http.get({
    url: `${Base_Url}/system/config/configKey/${configKey}`,
  });
}