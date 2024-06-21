import { defineStore } from "pinia";

// 定义store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    clientId: null,
    expireIn: null,
    openid: null,
    refreshExpireIn: null,
    refreshToken: null,
    scope: null,
    userInfo: {}
  }),
  actions: {
    SETLOGIN(data) {
      console.log('data=', data);
      const { access_token, client_id, expire_in, openid, refresh_expire_in, refresh_token, scope } = data;
      this.token = access_token;
      this.clientId = client_id;
      this.expireIn = expire_in;
      this.openid = openid;
      this.refreshExpireIn = refresh_expire_in;
      this.refreshToken = refresh_token;
      this.scope = scope;
    },
    LOGOUT() {
      this.token = null;
      this.clientId = null;
      this.expireIn = null;
      this.openid = null;
      this.refreshExpireIn = null;
      this.refreshToken = null;
      this.scope = null;
      uni.reLaunch({
        url: '/pages/login/index'
      })
    },
    SETUSERINFO(data) {
      this.userInfo = data
    }
  },
  persist: true,
  // persist: {
  //   storage: {
      
  //   }
  // }
});