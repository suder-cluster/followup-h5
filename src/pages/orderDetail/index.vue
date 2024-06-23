<template>
  <div class="order-detail-container">
    <u-cell-group>
      <u-cell-item
        :title="$t('orderDetail.orderNumber')"
        :value="detail.id"
        :arrow="false"
        bg-color="#000"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('orderDetail.account')"
        :value="detail.username"
        :arrow="false"
        bg-color="#000"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('orderDetail.quantity')"
        :value="detail.stock"
        :arrow="false"
        bg-color="#000"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('orderDetail.price')"
        :value="detail.username"
        :arrow="false"
        bg-color="#000"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <!-- <u-cell-item
        :value="Number(item.price) * Number(item.stock)"
      ></u-cell-item> -->
      <u-cell-item
        :title="$t('orderDetail.status')"
        :value="statusMap[detail.status]"
        :arrow="false"
        bg-color="#000"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('orderDetail.matchingTime')"
        :value="detail.createTime"
        :arrow="false"
        bg-color="#000"
        hover-class="hover-cell-item"
      ></u-cell-item>
    </u-cell-group>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
useTitle({ title: t("page.orderDetail") });

const statusMap = ref({
  0: "To be audit",
  1: "Success the audit",
  2: "Fail the audit",
});
const detail = ref({});

const initQuery = (opt) => {
  detail.value = JSON.parse(opt.detail);
};

onLoad((options) => {
  console.log("options=", options);
  initQuery(options);
});
</script>
<style lang="scss" scoped>
.order-detail-container {
  padding: 40rpx 20rpx;
}
.hover-cell-item {
  background-color: #222 !important;
}
</style>
