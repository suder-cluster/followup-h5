<template>
  <div class="recharge-container">
    <div class="amount-input">
      <span>{{ t("withdrawal.amount") }}: </span>
      <u-input v-model="amount" :placeholder="t('withdrawal.amountPl')"/>
    </div>
    <div class="submit-button">
      <button @click="onCellClick">{{ t("withdrawal.submit") }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import http from "@/api/http";
import UInput from "../../uni_modules/vk-uview-ui/components/u-input/u-input.vue";

const Base_Url = import.meta.env.VITE_APP_BASE_API;

const { t } = useI18n();
useTitle({ title: t("page.withdrawal") });

const amount = ref(undefined);

const cashOutApi = (params) => {
  return http.post(`${Base_Url}/h5/cash-out`, params);
};

const onCellClick = async () => {
  await cashOutApi({ amount: amount.value });
  uni.showToast({
    title: t("withdrawal.withdrawalSuccess"),
  });
  amount.value = undefined;
  uni.navigateTo({
    url: "/pages/accountDetail/index?type=1",
  });
};
</script>

<style lang="scss" scoped>
.recharge-container {
  padding: 40rpx;
  //background-color: #f5f5f5;
  border-radius: 8px;
}

.amount-input,
.submit-button {
  margin-bottom: 40rpx;
}

.amount-input span {
  margin-right: 20rpx;
}

.submit-button button {
  border: none;
  border-radius: 8rpx;
  cursor: pointer;
}
</style>
