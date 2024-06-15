<template>
  <u-tabbar bg-color="#000" inactive-color="#fff" v-model="current" :list="list" :mid-button="false"></u-tabbar>
</template>
<script setup>
import { ref } from "vue";

const current = ref(0);
const list = ref([
  {
    iconPath: "home",
    selectedIconPath: "home-fill",
    text: "首页",
    count: 2,
    isDot: true,
    customIcon: false,
  },
  {
    iconPath: "bag",
    selectedIconPath: "bag-fill",
    text: "大厅",
    customIcon: false,
  },
  // {
  //   iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
  //   selectedIconPath:
  //     "https://cdn.uviewui.com/uview/common/min_button_select.png",
  //   text: "发布",
  //   midButton: true,
  //   customIcon: false,
  // },
  {
    iconPath: "order",
    selectedIconPath: "order-fill",
    text: "订单",
    customIcon: false,
  },
  {
    iconPath: "account",
    selectedIconPath: "account-fill",
    text: "我的",
    count: 23,
    isDot: false,
    customIcon: false,
  },
]); 
</script>