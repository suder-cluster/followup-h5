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
    <u-form :model="formData">
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
      <el-form-item>
        <div class="upload-item">
          <u-upload :multiple="false"></u-upload>
        </div>
      </el-form-item>
    </u-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getConfigKey } from "@/api/modules/config";

const { t } = useI18n();
useTitle({ title: t("page.Recharge") });

// formData
const formData = ref({
  address: "",
  amount: 0,
});

// 获取配置
const getConfig = async () => {
  const { data } = await getConfigKey("water.waterAddress");
  console.log("data=", data);
  formData.value.address = data;
};

const init = () => {
  getConfig();
};
onShow(() => {
  init();
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
  }
}
.hover-cell-item {
  background-color: #222 !important;
}
</style>
