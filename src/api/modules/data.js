import http from '@/api/http'

const Base_Url = import.meta.env.VITE_APP_BASE_API;

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return http.get({
    url: `${Base_Url}/system/dict/data/type/${dictType}`
  });
}

//  查询参数接口