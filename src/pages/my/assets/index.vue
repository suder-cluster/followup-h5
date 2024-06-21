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
      <button class="recharge-button">{{ $t('my.recharge') }}</button>
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
import { getConfigKey } from '@/api/modules/getConfigKey';

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
// 获取配置
const getConfig = async () => {
  const { data } = await getConfigKey('water.waterAddress')
  console.log('data=', data);
}
onShow(() => {
  init();
});
</script>

<style scoped>
.assets {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.balance-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffe66d;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.balance {
  text-align: center;
}

.balance p {
  margin: 0;
  font-size: 14px;
}

.balance h1 {
  margin: 0;
  font-size: 36px;
}

.recharge-button {
  background-color: #ffae42;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.details {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.amount {
  color: #f60;
}
</style>
