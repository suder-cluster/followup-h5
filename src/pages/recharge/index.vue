<template>
  <div class="recharge-container">
    <u-cell-group>
      <u-cell-item
        :title="$t('recharge.address')"
        :value="formData.address"
        :index="0"
        bg-color="#000"
        :border-top="false"
        hover-class="hover-cell-item"
        @click="onCellClick"
      ></u-cell-item>
      <u-cell-item :title="$t('recharge.usdt')"></u-cell-item>
    </u-cell-group>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getConfigKey } from '@/api/modules/config';

const { t } = useI18n();
useTitle({ title: t("page.Recharge") });


const categoryShow = ref(false);
// formData
const formData = ref({
  address: ''
});

// 点击
const onCellClick = (value) => {
  console.log("value===", value);
  if (value === 0) {
  }
};
// 获取配置
const getConfig = async () => {
  const { data } = await getConfigKey('water.waterAddress')
  console.log('data=', data);
  formData.address = data;
}
const init = () => {
  getConfig();
}
onShow(() => {
  init();
})
</script>
<style lang="scss" scoped>
.hover-cell-item {
  background-color: #222 !important;
}
</style>
