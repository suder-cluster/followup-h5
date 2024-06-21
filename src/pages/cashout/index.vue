<template>
  <div class="recharge-container">
    <div class="amount-input">
      <span>{{ t("withdrawal.amount") }}: </span>
      <u-input v-model="amount"/>
    </div>
    <div class="submit-button">
      <button @click="onCellClick">{{ t("withdrawal.submit") }}</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useTitle} from "@/hooks/useTitle";
import {useI18n} from "vue-i18n";
import http from '@/api/http'
import UInput from "../../uni_modules/vk-uview-ui/components/u-input/u-input.vue";

const Base_Url = import.meta.env.VITE_APP_BASE_API;


const {t} = useI18n();
useTitle({title: t("page.withdrawal")});

const amount = ref(0);

const cashOutApi = (params) => {
  return http.post(`${Base_Url}/h5/cash-out`, params);
};

const onCellClick = () => {
  cashOutApi({amount: amount.value}).then(response => {
    // handle the response, e.g., show a success message
  }).catch(error => {
    // handle the error, e.g., show an error message
  });
};
</script>

<style lang="scss" scoped>
.recharge-container {
  padding: 20px;
  //background-color: #f5f5f5;
  border-radius: 8px;
}

.amount-input, .submit-button {
  margin-bottom: 20px;
}

.amount-input span {
  margin-right: 10px;
}

.submit-button button {
  //background-color: #007BFF;
  //color: white;
  //padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button button:hover {
  //background-color: #0056b3;
}
</style>
