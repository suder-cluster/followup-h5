<template>
  <div class="my-container">
    <div class="person-info">
      <div class="left">
        <div class="avatar">
          <u-avatar></u-avatar>
        </div>
        <div class="info">
          <div class="top-text">用户名</div>
          <div class="bottom-text">id：999999</div>
        </div>
      </div>
      <div class="right">
        <u-icon name="arrow-right" :size="36" color="#969799"></u-icon>
      </div>
    </div>
    <div class="usdt-item">
      <div class="left">
        <span class="title">{{ $t('my.usdtTitle') }}</span>
        <span class="num">100000</span>
      </div>
      <div class="right">
        <u-button type="warning" size="mini" plain>{{ $t('my.recharge') }}</u-button>
      </div>
    </div>
    <div class="eur-item">
      <div class="left">
        <span class="title">{{ $t('my.eurTitle') }}</span>
        <span class="num">100000</span>
      </div>
      <div class="right">
        <u-button type="error" size="mini" plain>{{ $t('my.withDraw') }}</u-button>
      </div>
    </div>
    <u-cell-group>
      <u-cell-item
        v-for="item in cellList"
        :icon="item.icon"
        :icon-style="item.iconStyle"
        :title="item.title"
        :value="item.value"
        bg-color="#000"
        :border-top="false"
        hover-class="hover-cell-item"
      ></u-cell-item>
    </u-cell-group>
    <my-tab-bar></my-tab-bar>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const cellList = ref([
{
    title: t("my.assets"),
    value: "",
    icon: 'red-packet-fill',
    iconStyle: "color: #e6a23c"
  },
  {
    title: t("my.accountBinding"),
    value: "",
    icon: 'plus-people-fill',
    iconStyle: "color: #e6a23c"
  },
  {
    title: t("my.accountDetail"),
    value: "",
    icon: 'account-fill',
    iconStyle: "color: #e6a23c"
  },
  {
    title: t("my.switchLang"),
    value: "",
    icon: 'grid-fill',
    iconStyle: "color: #e6a23c"
  },
  {
    title: t("my.logOut"),
    value: "",
    icon: 'zhuanfa',
    iconStyle: "color: #e6a23c"
  }
]);
</script>
<style lang="scss" scoped>
.my-container {
  padding: 20rpx;
  padding-bottom: 120rpx;
  .person-info {
    display: flex;
    justify-content: space-between;
    padding: 40rpx 28rpx 40rpx 0;
    .left {
      display: flex;
      align-items: center;
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 30rpx;
        .top-text {
          height: 60rpx;
          line-height: 60rpx;
          font-size: 32rpx;
        }
        .bottom-text {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 24rpx;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
  .usdt-item,
  .eur-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    padding: 20rpx;
    border: 2rpx solid #ccc;
    background-color: #fdf6ec;
    .left {
      display: flex;
      flex-direction: column;
      .title {
        color: #909399;
        font-size: 32rpx;
        line-height: 46rpx;
      }
      .num {
        color: #333;
        font-size: 32rpx;
      }
    }
  }
}
.hover-cell-item {
  background-color: #222 !important;
}
</style>
