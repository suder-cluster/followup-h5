<template>
  <div class="account-detail-container">
    <u-tabs
      ref="tabsRef"
      :list="tabsList"
      v-model="tabCurrent"
      @change="onTabChange"
      bg-color="#fff"
    ></u-tabs>
    <div class="detail-content" v-if="list.length > 0">
      <template v-if="tabCurrent === 0">
        <div class="detail-item" v-for="item in list" :key="item.id">
          <div class="left">
            <div class="title">
              {{ $t("accountDetail.rechargeText") }}
            </div>
            <div class="time">{{ item.createTime || "2024-06-22" }}</div>
          </div>
          <div class="right" style="color: #00cf78;">
            +{{ item.recharge }}
          </div>
        </div>
      </template>
      <template v-else-if="tabCurrent === 1">
        <div class="detail-item" v-for="item in list" :key="item.id">
          <div class="left">
            <div class="title">
              {{ $t("accountDetail.withdrawText") }}
            </div>
            <div class="time">{{ item.createTime || "2024-06-22" }}</div>
          </div>
          <div class="right" style="color: #ff3434;">
            -{{ item.recharge }}
          </div>
        </div>
      </template>
    </div>
    <no-data v-else></no-data>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import { useAllList } from "@/hooks/useAllList";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getAccountDetailApi } from "@/api/modules/accountDetail";

const { t } = useI18n();
useTitle({ title: t("page.accountDetail") });

const tabsList = ref([
  {
    name: t("accountDetail.rechargeText"),
  },
  {
    name: t("accountDetail.withdrawText"),
  },
]);

const tabCurrent = ref(0);

const config = ref({
  api: getAccountDetailApi,
  params: {
    type: 1,
  },
});
const { list, refreshList } = useAllList(config);

const onTabChange = (index) => {
  console.log("index=", index);
  if (index === 0) {
    config.value.params.type = 1;
  } else if (index === 1) {
    config.value.params.type = 2;
  }
  uni.startPullDownRefresh();
  refreshList();
};

onPullDownRefresh(() => {
  refreshList();
});
</script>
<style lang="scss" scoped>
.detail-content {
  padding: 20rpx;
  .detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
    padding: 20rpx 40rpx;
    border-radius: 10rpx;
    background-color: #fff;
    color: #000;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        padding-bottom: 10rpx;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
