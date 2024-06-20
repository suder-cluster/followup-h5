import http from '@/api/http'
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
  return http.post('/auth/login',params, {
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
  return http.post('/auth/register', params, {
    isToken: false,
    isEncrypt: true
  });
};
// 获取邮箱验证码
export const getEmailCodeApi = (params) => {
  return http.get('/resource/email/code', params, {
    isToken: false
  });
};