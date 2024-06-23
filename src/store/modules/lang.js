import { defineStore } from 'pinia';

// 定义store
export const useLangStore = defineStore('lang', {
  state: () => ({
    lang: 'en_US',
    version: undefined
  }),
  actions: {
    SETLANG(lang) {
      this.lang = lang;
    },
    SETINIT() {
      this.version = new Date().getTime();
    }
  },
  persist: true
})