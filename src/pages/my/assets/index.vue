<template>
  <div class="assets">
    <div class="header">
      <h2>{{ $t('my.assets') }}</h2>
    </div>
    <div class="balance-container">
      <div class="balance">
        <p>{{ $t('my.usdtTitle') }}</p>
        <h1>{{ userInfo.data.usdtBalance }}</h1>
      </div>
      <button class="recharge-button">{{ $t('my.recharge') }}</button>
    </div>
    <div class="details">
      <div class="detail">
        <span>{{ $t('my.rechargedAmount') }}</span>
        <span class="amount">+{{ assetsInfo.data.recharged === null ? '0.00' : assetsInfo.data.recharged }}</span>
      </div>
      <div class="detail">
        <span>{{ $t('my.soldAmount') }}</span>
        <span class="amount">+{{ assetsInfo.data.sold === null ? '0.00' : assetsInfo.data.sold }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useI18n} from "vue-i18n";
import {getAssetsApi, getInfoApi} from "@/api/modules/my";
import {ref} from "vue";
import {onShow} from "@dcloudio/uni-app";

const {t} = useI18n();


const assetsInfo = ref({});
const userInfo = ref({});
const init = async () => {
  assetsInfo.value = await getAssetsApi();
  userInfo.value = await getInfoApi();

  console.log("assetsInfo", assetsInfo.value);
  console.log("userInfo", userInfo.value);
};

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
