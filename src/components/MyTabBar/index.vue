<template>
  <u-tabbar bg-color="#000" inactive-color="#fff" active-color="#2b85e4" v-model="current" :list="list" :mid-button="false"></u-tabbar>
</template>
<script setup>
import { ref, computed } from "vue";
import { useTabBarStore } from '@/store/modules/tabBar';

const tabBarStore = useTabBarStore();
const current = computed({
  get() {
    return tabBarStore.getActiveTab
  },
  set(val) {
    tabBarStore.SETCURRENT(val)
    if (val === 0) {
      uni.navigateTo({
        url: '/pages/home/index'
      })
    } else if (val === 1) {
      uni.navigateTo({
        url: '/pages/hall/index'
      })
    } else if (val === 2) {
      uni.navigateTo({
        url: '/pages/order/index'
      })
    }
  }
})
const list = ref([
  {
    iconPath: "home",
    selectedIconPath: "home-fill",
    text: "首页",
    isDot: true,
    customIcon: false,
  },
  {
    iconPath: "bag",
    selectedIconPath: "bag-fill",
    text: "大厅",
    customIcon: false,
  },
  {
    iconPath: "order",
    selectedIconPath: "order",
    text: "订单",
    customIcon: false,
  },
  {
    iconPath: "account",
    selectedIconPath: "account-fill",
    text: "我的",
    isDot: false,
    customIcon: false,
  },
]); 
</script>