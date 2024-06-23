<template>
  <div class="team-container">
    <div class="team-content">
      <div class="team-num">
        <div class="title-label">{{ $t('team.titleLabel') }}</div>
        <div class="title-text">{{ list.length }}</div>
      </div>
      <div class="team-item" v-for="item in list" :key="item.userId">
        <div class="left">
          <u-avatar :src="item.avatar" :size="72"></u-avatar>
        </div>
        <div class="right">
          <span>{{ $t('team.id') }}: {{ item.userId }}</span>
          <span class="registry-time">{{ $t('team.registryTime') }}: {{ item.createTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { getTeamListApi } from "@/api/modules/team";
import { useAllList } from "@/hooks/useAllList";

const { t } = useI18n();
useTitle({ title: t("page.team") });

const config = ref({
  api: getTeamListApi,
});
const { list, refreshList } = useAllList(config);

onPullDownRefresh(() => {
  refreshList();
});
</script>
<style lang="scss" scoped>
.team-container {
  padding: 20rpx;
  .team-num {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20rpx;
    padding: 20rpx 40rpx;
    border-radius: 10rpx;
    background-color: #e6a23c;
    .title-label {
      padding-bottom: 10rpx;
      color: #444;
      font-size: 28rpx;
    }
    .title-text {
      font-size: 40rpx;
      color: #000;
      font-weight: 600;
    }
  }
  .team-item {
    display: flex;
    margin-bottom: 20rpx;
    padding: 20rpx 40rpx;
    border-radius: 10rpx;
    background-color: #fff;
    color: #000;
    .left {
      padding-right: 20rpx;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #444;
    }
  }
}
</style>
