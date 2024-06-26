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
      >
        <template #right-icon>
          <span
            class="iconfont icon-fuzhi"
            style="margin-left: 10rpx"
            @click="onCopy(1)"
          ></span>
        </template>
      </u-cell-item>
      <u-cell-item
        :title="$t('recharge.address2')"
        :value="formData.address2"
        :index="1"
        bg-color="#000"
        :arrow="false"
        :border-top="false"
        hover-class="hover-cell-item"
      >
        <template #right-icon>
          <span
            class="iconfont icon-fuzhi"
            style="margin-left: 10rpx"
            @click="onCopy(2)"
          ></span>
        </template>
      </u-cell-item>
    </u-cell-group>
    <u-form ref="formRef" :model="formData">
      <u-form-item prop="amount">
        <u-field
          v-model="formData.amount"
          :label="$t('recharge.money')"
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
          <u-button type="warning" :disabled="isDisableSubmit" @click="onSubmit" :loading="isLoading">{{
            $t("common.confirmText")
          }}</u-button>
        </div>
      </el-form-item>
    </u-form>
  </div>
</template>
<script setup>
import { ref, nextTick, computed } from "vue";
import { onShow, onReady } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getConfigKey } from "@/api/modules/config";
import { rechargeApi } from "@/api/modules/recharge";
import { useAuthStore } from "@/store/modules/auth";
import { requireR } from "@/regular";

const authStore = useAuthStore();

const Base_Url = import.meta.env.VITE_APP_BASE_API;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const { t } = useI18n();
useTitle({ title: t("page.recharge") });

const actionUrl = `${Base_Url}/resource/oss/upload`;
const headers = ref({
  Authorization: "Bearer " + authStore.token,
  clientid: clientId,
});

// Ref
const uploadRef = ref();
const formRef = ref();

const isDisableSubmit = computed(() => {
  return !formData.value.amount || !formData.value.voucherImg
})

// formData
const formData = ref({
  address: "",
  address2: "",
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
  const { data:data2 } = await getConfigKey("water.waterAddress.erc");
  console.log("data=", data);
  formData.value.address = data;
  formData.value.address2 = data2;
};

const onCopy = (type) => {
  if (type === 1) {
    uni.setClipboardData({
      data: formData.value.address, // e是你要保存的内容
      success: function () {
        uni.showToast({
          title: t('copySuccess'),
          icon: "none",
        });
      },
    });
  } else if (type === 2) {
    uni.setClipboardData({
      data: formData.value.address2, // e是你要保存的内容
      success: function () {
        uni.showToast({
          title: t('copySuccess'),
          icon: "none",
        });
      },
    });
  }
  
};

// onsuccess
const onSuccess = (data, index, lists, name) => {
  console.log("arges=", data, index, lists, name);
  if (data.code !== 200) {
    formData.value.voucherImg = "";
    uploadRef.value.clear();
  } else {
    formData.value.voucherImg = data.data.url;
  }
};
// onError
const onError = (value) => {
  console.log("value=", value);
  uploadRef.value.clear();
};

const onSubmit = async () => {
  isLoading.value = true;
  const { amount, voucherImg } = formData.value;
  if (!amount || !voucherImg) {
    isLoading.value = false;
    return uni.$u.toast("Please complete the information!");
  }
  try {
    await rechargeApi({
      amount,
      voucherImg,
    });
    uni.$u.toast(t("operation.success"));
    formData.value.voucherImg = undefined;
    formData.value.amount = undefined;
    nextTick(() => {
      uploadRef.value.clear();
    })
  } catch (err) {
  } finally {
    isLoading.value = false;
  }
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
