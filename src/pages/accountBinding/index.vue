<template>
  <div class="binding-container">
    <u-form :label-width="180">
      <u-form-item :label="$t('accountBinding.country')">
        <u-input
          v-model="formData.country"
          :border-bottom="false"
          :placeholder="$t('accountBinding.countryPl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.region')">
        <u-input
          v-model="formData.region"
          :border-bottom="false"
          :placeholder="$t('accountBinding.regionPl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.bankName')">
        <u-input
          v-model="formData.bankName"
          :border-bottom="false"
          :placeholder="$t('accountBinding.bankNamePl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.iban')">
        <u-input
          v-model="formData.iban"
          :border-bottom="false"
          :placeholder="$t('accountBinding.ibanPl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.account')">
        <u-input
          v-model="formData.account"
          :border-bottom="false"
          :placeholder="$t('accountBinding.accountPl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.name')">
        <u-input
          v-model="formData.name"
          :border-bottom="false"
          :placeholder="$t('accountBinding.namePl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.surname')">
        <u-input
          v-model="formData.surname"
          :border-bottom="false"
          :placeholder="$t('accountBinding.surnamePl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.address')">
        <u-input
          v-model="formData.address"
          :border-bottom="false"
          :placeholder="$t('accountBinding.addressPl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.zipCode')">
        <u-input
          v-model="formData.address"
          :border-bottom="false"
          :placeholder="$t('accountBinding.zipCodePl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.city')">
        <u-input
          v-model="formData.city"
          :border-bottom="false"
          :placeholder="$t('accountBinding.cityPl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.province')">
        <u-input
          v-model="formData.prov"
          :border-bottom="false"
          :placeholder="$t('accountBinding.provincePl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.mail')">
        <u-input
          v-model="formData.mail"
          :border-bottom="false"
          :placeholder="$t('accountBinding.mailPl')"
          input-align="right"
          type="textarea "
          :maxlength="255"
          auto-height
        ></u-input>
      </u-form-item>
    </u-form>
    <div class="btn-container">
      <u-button style="width: 100%" type="warning" @click="onConfirm">{{
        $t("common.confirmText")
      }}</u-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onShow, onPullDownRefresh } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import {
  getAccountBindDetailApi,
  modifyAccountBindApi,
} from "@/api/modules/accountBind";

const { t } = useI18n();
useTitle({ title: t("page.accountBind") });

const formData = ref({
  country: "",
  region: "",
  bankName: "",
  iban: "",
  account: "",
  name: "",
  surname: "",
  address: "",
  zipCode: "",
  city: "",
  prov: "",
  mail: "",
});

const isLoading = ref(false);

const onConfirm = async () => {
  isLoading.value = true;
  try {
    await modifyAccountBindApi(formData.value);
    uni.$u.toast(t("operation.success"));
    await init();
  } catch (err) {
  } finally {
    isLoading.value = false;
  }
};

// 初始化
const init = async () => {
  try {
    uni.startPullDownRefresh();
    const { data } = await getAccountBindDetailApi();
    formData.value = { ...(data || {}) };
  } catch (err) {
  } finally {
    uni.stopPullDownRefresh();
  }
};

onPullDownRefresh(() => {
  init();
});
onShow(() => {
  init();
});
</script>
<style lang="scss" scoped>
.binding-container {
  padding: 20rpx;
  .u-form {
    padding: 20rpx;
    .u-form-item {
      padding: 0 20rpx 0 20rpx;
      background-color: #ff9900;
    }
  }
  .btn-container {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20rpx;
  }
}
.hover-cell-item {
  background-color: #222 !important;
}
</style>
