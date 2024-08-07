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
            <div class="time">{{ item.updateTime  }}</div>
          </div>
          <div class="right" style="color: #00cf78;">
            <div>
              <u-tag :text="$t(`withdrawal.${auditMap[item.status]}`)" mode="light" size="mini" shape="circleRight" :type="auditTypeMap[item.status]"/>
            </div>
            <div>+{{ item.amount }}&nbsp;USDT</div>
          </div>
        </div>
      </template>
      <template v-else-if="tabCurrent === 1">
        <div class="detail-item" v-for="item in list" :key="item.id">
          <div class="left">
            <div class="title">
              {{ $t("accountDetail.withdrawText") }}
            </div>
            
            <div class="time">{{ item.updateTime  }}</div>
          </div>
          <div class="right" style="color: #ff3434;">
            <div>
              <u-tag :text="$t(`withdrawal.${auditMap[item.status]}`)" mode="light" size="mini" shape="circleRight" :type="auditTypeMap[item.status]"/>
            </div>
            <div style="margin-top: 10rpx">-{{ item.amount }}&nbsp;EU</div>
          </div>
        </div>
      </template>
    </div>
    <no-data v-else></no-data>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onPullDownRefresh, onLoad } from "@dcloudio/uni-app";
import { useAllList } from "@/hooks/useAllList";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getAccountDetailApi } from "@/api/modules/accountDetail";

const { t } = useI18n();
useTitle({ title: t("page.accountDetail") });

const auditMap = {
  0: "wait",
  1: "audited",
  2: "unaudit"
}
const auditTypeMap = {
  0: 'info',
  1: 'success',
  2: 'warning'
}
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
  auto: false,
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
  refreshList();
};

onLoad((options) => {
  console.log('options=', options)
  const { type } = options;
  if (type) {
    tabCurrent.value = type - 0;
    onTabChange(tabCurrent.value)
  }
})

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
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
