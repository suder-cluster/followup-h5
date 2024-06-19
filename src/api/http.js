import { decryptBase64, decryptWithAes, encryptBase64, encryptWithAes, generateAesKey } from '@/utils/crypto';
import { decrypt, encrypt } from '@/utils/jsencrypt';

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

  setResponse() {

  }
  async get(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: Base_Url + url,
        method: "GET",
        header: {},
        data,
        timeout: this.timeout,
        ...config,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
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
          resolve(res)
        },
        fail: (err) => {
          uni.showToast({
            icon: "error",
            title: "请求接口失败",
          });
          reject(err);
        },
      });
    });
  }
}

export default new Http()
