<template>
  <div class="binding-container">
    <u-form :label-width="180">
      <u-form-item :label="$t('accountBinding.country')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.countryPl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.region')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.regionPl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.bankName')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.bankNamePl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.iban')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.ibanPl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.account')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.accountPl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.name')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.namePl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.surname')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.surnamePl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.address')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.addressPl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.zipCode')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.zipCodePl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.city')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.cityPl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.province')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.provincePl')" input-align="right"></u-input>
      </u-form-item>
      <u-form-item :label="$t('accountBinding.mail')">
        <u-input :border-bottom="false" :placeholder="$t('accountBinding.mailPl')" input-align="right"></u-input>
      </u-form-item>
    </u-form>
    <div class="btn-container">
      <u-button style="width: 100%" type="warning" @click="onConfirm">{{ $t('common.confirmText') }}</u-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getAccountBindDetailApi, modifyAccountBindApi } from '@/api/modules/accountBind';

const { t } = useI18n();
useTitle({ title: t("page.accountBind") });

const formData = ref({
  "country": "dolore tempor qui esse",
    "region": "mollit id consequat",
    "bankName": "名省活",
    "iban": "reprehenderit",
    "account": "sed velit dolore",
    "name": "亲划回约南证格",
    "surname": "感同容受",
    "address": "江苏省宜昌市河北区",
    "zipCode": "16",
    "city": "离岛",
    "prov": "in sunt ex mollit",
    "mail": "f.cwrjpjs@qq.com"
})

const isLoading = ref(false)

const onConfirm = async () => {
  isLoading.value = true;
  try {
    await modifyAccountBindApi(formData.value)
    uni.$u.toast(t('operation.success'))
    await init();
  } catch(err) {
  } finally {
    isLoading.value = false;
  }
  
}

// 初始化
const init = async () => {
  const { data } = await getAccountBindDetailApi()
  formData.value = {...formData.value, ... (data || {})}
}

onShow(() => {
  init()
})
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