<template>
  <div class="recharge-container">
    <u-cell-group>
      <u-cell-item
        :title="$t('recharge.address')"
        :value="formData.address"
        :index="0"
        bg-color="#000"
        :arrow="false"
        :border-top="false"
        hover-class="hover-cell-item"
      ></u-cell-item>
    </u-cell-group>
    <u-form ref="formRef" :model="formData">
      <u-form-item prop="amount">
        <u-field
          v-model="formData.amount"
          :label="$t('recharge.usdt')"
          :label-width="100"
          :placeholder="$t('recharge.usdtPl')"
          :border-bottom="false"
        >
        </u-field>
      </u-form-item>
      <u-form-item prop="voucherImg">
        <div class="upload-item">
          <u-upload
            ref="uploadRef"
            :action="actionUrl"
            :multiple="false"
            :max-count="1"
            :header="headers"
            :upload-text="$t('upload.text1')"
            @on-error="onError"
            @on-success="onSuccess"
          >
          </u-upload>
        </div>
      </u-form-item>
      <el-form-item>
        <div class="btn-container" style="padding-top: 40rpx">
          <u-button type="warning" @click="onSubmit" :loading="isLoading">{{
            $t("common.confirmText")
          }}</u-button>
        </div>
      </el-form-item>
    </u-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onShow, onReady } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getConfigKey } from "@/api/modules/config";
import { rechargeApi } from "@/api/modules/recharge";
import { useAuthStore } from "@/store/modules/auth";
import { requireR } from "@/regular";

const authStore = useAuthStore();

const Base_Url = import.meta.env.VITE_APP_BASE_API;
const { t } = useI18n();
useTitle({ title: t("page.recharge") });

const actionUrl = `${Base_Url}/resource/oss/upload`;
const headers = ref({
  Authorization: "Bearer " + authStore.token,
});

// Ref
const uploadRef = ref();
const formRef = ref();
// formData
const formData = ref({
  address: "",
  amount: undefined,
  voucherImg: undefined,
});
const rules = ref({
  address: [requireR(t("recharge.usdtPl"))],
  voucher: [requireR(t("recharge.voucherPl"))],
});
const isLoading = ref(false);

// 获取配置
const getConfig = async () => {
  const { data } = await getConfigKey("water.waterAddress");
  console.log("data=", data);
  formData.value.address = data;
};

// onsuccess
const onSuccess = (data, index, lists, name) => {
  console.log("arges=", data, index, lists, name);
  if (data.code !== 200) {
    formData.value.voucherImg = "";
    uploadRef.value.clear();
  } else {
    formData.value.voucherImg = data;
  }
};
// onError
const onError = (value) => {
  console.log("value=", value);
};

const onSubmit = async () => {
  isLoading.value = true;
  const { amount, voucherImg } = formData.value;
  if (!amount || !voucherImg) {
    isLoading.value = false;
    return uni.$u.toast("Please complete the information!")
  }
  try {
    await rechargeApi({
      amount,
      voucherImg,
    });
    uni.$u.toast(t("operation.success"));
  } catch (err) {
  } finally {
    isLoading.value = false;
  }
  // formRef.value.validate(async (isValid) => {
    
  // });
};

const init = () => {
  getConfig();
};
onShow(() => {
  init();
});
onReady(() => {
  formRef?.value?.setRules(rules.value);
});
</script>
<style lang="scss" scoped>
.recharge-container {
  box-sizing: border-box;
  padding: 20rpx;
  padding-bottom: 100rpx;
  .upload-item {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 40rpx;
    ::v-deep .u-list-item {
      border: 2rpx solid #333;
      background-color: #000;
    }
    .u-add-btn {
    }
  }
}
.hover-cell-item {
  background-color: #222 !important;
}
</style>
