import { defineStore } from 'pinia';

// 定义store
export const useTabBarStore = defineStore('tabBar', {
  state: () => ({
    activeTab: 0
  }),
  getters: {
    getActiveTab() {
      return this.activeTab
    }
  },
  actions: {
    SETCURRENT(value) {
      this.activeTab = value;
      console.log('value=', value)
      console.log('value=', this.activeTab)
    }
  },
  persist: false
})