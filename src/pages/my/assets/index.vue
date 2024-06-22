<template>
  <div class="assets">
    <div class="header">
      <h2>{{ $t('my.assets') }}</h2>
    </div>
    <div class="balance-container">
      <div class="balance">
        <p>{{ $t('my.usdtTitle') }}</p>
        <h1>{{ userInfo.usdtBalance }}</h1>
      </div>
      <u-button class="recharge-button" type="warning" @click="goToPage('recharge')">{{ $t('my.recharge') }}</u-button>
    </div>
    <div class="details">
      <div class="detail">
        <span>{{ $t('my.rechargedAmount') }}</span>
        <span class="amount">+{{ assetsInfo.recharged === null ? '0.00' : assetsInfo.recharged }}</span>
      </div>
      <div class="detail">
        <span>{{ $t('my.soldAmount') }}</span>
        <span class="amount">+{{ assetsInfo.sold === null ? '0.00' : assetsInfo.sold }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getAssetsApi, getInfoApi} from "@/api/modules/my";
import {ref} from "vue";
import {onShow} from "@dcloudio/uni-app";
import { useTitle } from '@/hooks/useTitle';
import { useI18n } from "vue-i18n";


const {t} = useI18n();
useTitle({ title: t('page.myAssets') })



const assetsInfo = ref({});
const userInfo = ref({});
const init = async () => {
  const { data: assets = {} } = await getAssetsApi();
  const { data: user } = await getInfoApi();
  assetsInfo.value = assets || {};
  userInfo.value = user;

  console.log("assetsInfo", assetsInfo.value);
  console.log("userInfo", userInfo.value);
};

const goToPage = (type) => {
  if (type === 'recharge') {
    uni.navigateTo({
      url: '/pages/recharge/index'
    })
  }
}

onShow(() => {
  init();
});
</script>

<style scoped>
.assets {
  padding: 40rpx;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
}

.balance-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffe66d;
  padding: 40rpx;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
}

.balance {
  text-align: center;
}

.balance p {
  margin: 0;
  font-size: 28rpx;
}

.balance h1 {
  margin: 0;
  font-size: 72rpx;
}

/* .recharge-button {
  background-color: #ffae42;
  border: none;
  padding: 20rpx 40rpx;
  border-radius: 10rpx;
  cursor: pointer;
} */

.details {
  padding: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
}

.detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.amount {
  color: #f60;
}
</style>
