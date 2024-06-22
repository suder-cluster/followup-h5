<template>
  <div class="order-container">
    <u-subsection
      :list="tabs"
      :current="current"
      @change="currentChange"
    ></u-subsection>
    <div class="order-container">
      <div class="order-item" v-for="item in list" :key="item.id" @click="goDetail">
        <div class="order-item-item">
          <div class="order-item-item-label">order number:</div>
          <div class="order-item-item-content">{{ item.id }}</div>
        </div>
        <div class="order-item-item">
          <div class="order-item-item-label">account:</div>
          <div class="order-item-item-content">{{ item.username }}</div>
        </div>
        <div class="order-item-item">
          <div class="order-item-item-label">quantity:</div>
          <div class="order-item-item-content">{{ item.stock }}</div>
        </div>
        <div class="order-item-item">
          <div class="order-item-item-label">price:</div>
          <div class="order-item-item-content">
            {{ Number(item.price) * Number(item.stock) }}EUR
          </div>
        </div>
        <div class="order-item-item">
          <div class="order-item-item-label">status:</div>
          <div class="order-item-item-content">{{ statusMap[item.status] }}</div>
        </div>
        <div class="order-item-item">
          <div class="order-item-item-label">matching time:</div>
          <div class="order-item-item-content">{{ item.createTime }}</div>
        </div>
      </div>
    </div>
    <my-tab-bar></my-tab-bar>
  </div>
</template>
<script setup name="Order">
import { ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { useList } from "@/hooks/useList";
import { getOrderListApi } from "@/api/modules/order";
import { useTitle } from '@/hooks/useTitle';
import { useI18n } from "vue-i18n";


const { t } = useI18n();
useTitle({ title: t('page.order') })

const config = ref({
  api: getOrderListApi,
  params: {
    status: undefined,
  },
});
const statusMap = ref({
  "0": "To be audit",
    "1": "Success the audit",
    "2": "Fail the audit"
})
const { list, refreshList, loadMore } = useList(config);
const tabs = ref([
  {
    name: t("order.all"),
  },
  {
    name: t("order.waitAudit"),
  },
  {
    name: t("order.waitAudit"),
  },
  {
    name: t("order.waitAudit"),
  },
]);
const current = ref(0);

const currentChange = (value) => {
  console.log("value=", value);
  if (value === 0) {
    config.value.params.status = undefined;
  } else if (value === 1) {
    config.value.params.status = 0;
  } else if (value === 2) {
    config.value.params.status = 1;
  } else if (value === 3) {
    config.value.params.status = 2;
  }
  refreshList();
};

const goDetail = (order) => {
  console.log('order=', order)
  uni.navigateTo({
    url: `/pages/orderDetail/index?detail=${order}`
  })
}

onPullDownRefresh(() => {
  refreshList();
});
onReachBottom(() => {
  loadMore()
})
</script>
<style lang="scss" scoped>
.order-container {
  display: flex;
  flex-direction: column;
  padding: 40rpx 20rpx 120rpx;
  .order-item {
    margin-bottom: 20rpx;
    border-radius: 8rpx;
    background-color: #fdf6ec;
    color: #000;
  }
  .order-item-item {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20rpx 40rpx;
  }
}
</style>
