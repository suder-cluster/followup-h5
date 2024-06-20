<template>
  <div class="assets">
    <div class="header">
      <h2>{{ $t('my.assets') }}</h2>
    </div>
    <div class="balance-container">
      <div class="balance">
        <p>{{ $t('my.usdtTitle') }}</p>
        <!--        <h1>{{ userInfo.usdtBanlance }}</h1>-->
      </div>
      <button class="recharge-button">{{ $t('my.recharge') }}</button>
    </div>
    <div class="details">
      <div class="detail">
        <span>{{ $t('my.rechargedAmount') }}</span>
        <!--        <span class="amount">+{{ assetsInfo.recharged }}</span>-->
      </div>
      <div class="detail">
        <span>{{ $t('my.soldAmount') }}</span>
        <!--        <span class="amount">+{{ assetsInfo.sold }}</span>-->
      </div>
      <!--      <div class="detail">-->
      <!--        <span>{{ $t('my.dearningsObtained') }}</span>-->
      <!--        <span class="amount">+0.00</span>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script setup>

import {getAssetsApi, getInfoApi} from "@/api/modules/my";
import {ref} from "vue";
import {onShow} from "@dcloudio/uni-app";


const assetsInfo = ref({});
const userInfo = ref({});
const init = async () => {
  console.log(assetsInfo.value)
  assetsInfo.value = await getAssetsApi();
  console.log(assetsInfo)
  userInfo.value = await getInfoApi();
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
