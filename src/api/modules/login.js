import http from '@/api/http'
const Base_Url = import.meta.env.VITE_APP_BASE_API;
// pc端固定客户端授权id
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
// 登录接口
export const loginApi = (data) => {
  console.log('clientId=', clientId)
  const params = {
    ...data,
    clientId: data.clientId || clientId,
    grantType: data.grantType || 'password'
  }
  return http.post(`${Base_Url}/auth/login`,params, {
    isToken: false,
    isEncrypt: true
  });
};

// 注册
export const registryApi = (data) => {
  const params = {
    ...data,
    clientId: clientId,
    grantType: 'email'
  }
  return http.post(`${Base_Url}/auth/register`, params, {
    isToken: false,
    isEncrypt: true
  });
};
// 获取邮箱验证码
export const getEmailCodeApi = (params) => {
  return http.get(`${Base_Url}/resource/email/code`, params, {
    isToken: false
  });
};

// 获取邮箱验证码
export const logOutApi = () => {
  return http.post(`${Base_Url}/auth/logout`);
};

// 修改密码
export const modifyPassApi = (params) => {
  return http.put(`${Base_Url}/system/user/profile/updatePwd`, params, {
    isEncrypt: true
  })
}