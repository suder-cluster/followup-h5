import { decryptBase64, decryptWithAes, encryptBase64, encryptWithAes, generateAesKey } from '@/utils/crypto';
import { decrypt, encrypt } from '@/utils/jsencrypt';
// import { useI18n} from 'vue-i18n';

const Base_Url = import.meta.env.VITE_APP_BASE_API;
console.log("baseUrl=", Base_Url);
const encryptHeader = 'encrypt-key';

class Http {

  constructor(timeout) {
    this.timeout = timeout
  }
  setRequest(params = {}, config = {}) {
    console.log('config=', config);
    let headers = {};
    let data = params
    const { isEncrypt } = config;
    if (isEncrypt === true) {
      // 生成一个 AES 密钥
      const aesKey = generateAesKey();
      console.log('aesKey=', aesKey)
      headers[encryptHeader] = encrypt(encryptBase64(aesKey));
      console.log('headers=', encryptBase64(aesKey))
      data = Object.prototype.toString.call(data) === "[object Object]" ? encryptWithAes(JSON.stringify(data), aesKey) : encryptWithAes(data, aesKey)
    }
    
    return {
      data,
      headers
    }
  }

  setResponse(res, resolve, reject) {
    console.log('response=', res);
    // const { t } = useI18n();
    if (res.statusCode !== 200) {
      uni.$u.toast('网络错误', 3000)
      // uni.$u.toast(`${t('err.network')}${res.statusCode}`, 3000)
      return reject(res.statusCode)
    }
    if (res.data.code === 200) {
      return resolve(res.data)
    } else if (res.data.code === 401) {
      // uni.$u.toast(t('error.expiration'), 3000)
      uni.$u.toast('登录过期，重新登录', 3000)
      return reject(res.data)
    } else {
      uni.$u.toast(`${res.data.msg}`, 3000)
      return reject(res.data)
    }
  }
  async get(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      const { data, headers } = this.setRequest(params, config);
      console.log('data=', data)
      uni.request({
        url: Base_Url + url,
        method: "GET",
        header: headers,
        data,
        timeout: this.timeout,
        ...config,
        success: (res) => {
          return this.setResponse(res, resolve, reject)
        },
        fail: (err) => {
          console.log('err=', err)
          uni.showToast({
            icon: "error",
            title: "请求接口失败",
          });
          reject(err);
        },
      });
    });
  }

  async post(url, params = {}, config) {
    // const { t } = useI18n();
    return new Promise((resolve, reject) => {
      const { data, headers } = this.setRequest(params, config);
      console.log('data=', data);
      console.log('headers=', headers);
      uni.request({
        url: Base_Url + url,
        method: "POST",
        data,
        header: headers,
        timeout: this.timeout,
        ...config,
        success: (res) => {
          return this.setResponse(res, resolve, reject)
        },
        fail: (err) => {
          uni.showToast({
            icon: "error",
            title: '请求错误'
          });
          reject(err);
        },
      });
    });
  }
}

export default new Http()
