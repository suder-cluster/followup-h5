import { decryptBase64, decryptWithAes, encryptBase64, encryptWithAes, generateAesKey } from '@/utils/crypto';
import { decrypt, encrypt } from '@/utils/jsencrypt';
import { useLangStore } from '@/store/modules/lang';
import { useAuthStore } from '@/store/modules/auth';
// import { useI18n} from 'vue-i18n';

const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const encryptHeader = 'encrypt-key';

class Http {

  constructor(timeout) {
    this.timeout = timeout
  }
  setRequest(params = {}, config = {}) {
    const langStore = useLangStore();
    const authStore = useAuthStore();
    console.log('config=', config);
    let headers = {
      'Content-Language': langStore.lang,
      clientid: clientId
    };
    let data = params
    const { isEncrypt, isToken = true } = config;

    if (isToken) {
      headers['Authorization'] = 'Bearer ' + authStore.token
    }

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
      uni.reLaunch({
        url: '/pages/login/index'
      })
      return reject(res.data)
    } else {
      uni.$u.toast(`${res.data.msg}`, 3000)
      return reject(res.data)
    }
  }
  async get(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      const { data, headers } = this.setRequest(params, config);
      uni.request({
        url: url,
        method: "GET",
        header: headers,
        data,
        timeout: this.timeout,
        ...config,
        success: (res) => {
          return this.setResponse(res, resolve, reject)
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
//   {
//     "createDept": 103,
//     "createBy": 1,
//     "createTime": "2024-06-16 21:12:24",
//     "updateBy": 1,
//     "updateTime": "2024-06-18 11:32:45",
//     "id": "1802328371525369858",
//     "floorOrderId": "1",
//     "userId": 1,
//     "username": "1",
//     "price": "1.00",
//     "stock": 1,
//     "status": 1,
//     "reason": "1",
//     "offsetDay": 3,
//     "userCardVo": null
// },
  async post(url, params = {}, config) {
    // const { t } = useI18n();
    return new Promise((resolve, reject) => {
      const { data, headers } = this.setRequest(params, config);
      uni.request({
        url: url,
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
