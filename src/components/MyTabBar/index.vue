<template>
  <!-- v-model="current" -->
  <u-tabbar
    :height="100"
    bg-color="#000"
    inactive-color="#fff"
    active-color="#2b85e4"
    :list="list"
    :mid-button="false"
  ></u-tabbar>
</template>
<script setup>
import { computed, ref } from "vue";
import { useTabBarStore } from "@/store/modules/tabBar";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tabBarStore = useTabBarStore();
const current = computed({
  get() {
    return tabBarStore.getActiveTab;
  },
  set(val) {
    tabBarStore.SETCURRENT(val);
    if (val === 0) {
      uni.navigateTo({
        url: "/pages/home/index",
      });
    } else if (val === 1) {
      uni.navigateTo({
        url: "/pages/hall/index",
      });
    } else if (val === 2) {
      uni.navigateTo({
        url: "/pages/order/index",
      });
    } else if (val === 3) {
      uni.navigateTo({
        url: "/pages/my/index",
      });
    }
  },
});
const list = ref([
  {
    iconPath: "home",
    selectedIconPath: "home-fill",
    text: t("page.home"),
    isDot: true,
    customIcon: false,
    pagePath: '/pages/home/index'
  },
  {
    iconPath: "bag",
    selectedIconPath: "bag-fill",
    text: t("page.hall"),
    customIcon: false,
    pagePath: '/pages/hall/index'
  },
  {
    iconPath: "order",
    selectedIconPath: "order",
    text: t("page.order"),
    customIcon: false,
    pagePath: '/pages/order/index'
  },
  {
    iconPath: "account",
    selectedIconPath: "account-fill",
    text: t("page.my"),
    isDot: false,
    customIcon: false,
    pagePath: '/pages/my/index'
  },
]);
</script>
