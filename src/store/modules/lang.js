import { defineStore } from 'pinia';

// 定义store
export const useLangStore = defineStore('lang', {
  state: () => ({
    lang: 'en'
  }),
  actions: {
    SETLANG(lang) {
      this.lang = lang;
    }
  },
  persist: true
})