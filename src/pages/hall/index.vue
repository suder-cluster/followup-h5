<template>
  <div class="hall-container">
    <div class="hall-title">
      {{ $t("hall.title") }}
    </div>
    <div class="balance-container">
      <div class="balance">
        <p>{{ $t("my.usdtTitle") }}</p>
        <h1>{{ userInfo.usdtBalance }}</h1>
      </div>
      <!-- <button class="recharge-button" v-if="scList.length > 0">{{ $t("my.recharge") }}</button> -->
    </div>
    <!-- <scrollList
      v-if="scList.length > 0"
      v-loading="isLoading"
      class="scroll-list"
      :list="scList"
      :time="200"
      :height="480"
      :line_height="80"
    > -->
    <!-- <div class="scroll-list-container">
        <div class="scroll-item" v-for="rows in scList" :key="rows.id">
          <div class="left">
            <div class="avatar">
              <u-avatar
                :src="rows.avatar"
                mode="circle"
                :size="60"
                style="overflow: hidden"
              ></u-avatar>
            </div>
          </div>
          <div class="right">
            <div class="email">{{ rows.email }}</div>
            <span class="label">{{ $t("hall.selling") }}: &nbsp;</span>
            <div class="selling">
              <span class="stock">{{ rows.stock }}</span>
            </div>
            <div class="usdt">
              <span>{{ $t("hall.usdt") }}: </span>
              <span>{{ rows.offsetDay }}{{ $t("hall.offsetDayUnit") }}</span>
            </div>
          </div>
        </div>
    </div> -->
    <!-- </scrollList> -->
    <u-line style="margin: 20rpx 0;"/>
    <div class="list-container" v-if="list.length > 0">
      <div class="list-item" v-for="item in list" :key="item.id">
        <div class="list-item-top">
          <div class="avatar">
            <u-avatar mode="circle" :src="item.avatar" :size="60"></u-avatar>
          </div>
          <div class="other-info">
            <span class="username">{{ item.username }}</span>
            <span class="email">{{ item.email }}</span>
          </div>
          <!-- <div class="username">{{ item.username }}</div>
          <div class="email"></div> -->
        </div>
        <div class="list-item-center">
          <div class="price">
            <div class="price-num">{{ item.price }}</div>
            <div class="price-text">unit-price</div>
          </div>
          <div class="ustd">
            <div class="ustd-num">{{ item.curStock }}</div>
            <div class="ustd-text">Number(USDT)</div>
          </div>
          <div class="ustd2">
            <div class="ustd2-num">{{ item.totalStock }}</div>
            <div class="ustd2-text">Uncompleted(USDT)</div>
          </div>
        </div>
        <div class="list-item-bottom">
          <div class="left">
            <span>{{ $t("hall.limit") }}: </span>
            <span>{{ item.min }}-{{ item.max }}&nbsp;USDT</span>
          </div>
          <div class="right">
            <u-button
              type="warning"
              shape="circle"
              size="mini"
              @click="() => openSell(item)"
              >{{ $t("hall.goSale") }}</u-button
            >
          </div>
        </div>
      </div>
    </div>
    <no-data v-else></no-data>
    <u-modal
      :title="$t('hall.sellModalTitle')"
      v-model="sellVisible"
      @confirm="onConfirm"
      @cancel="onCancel"
      ref="uModal1"
      :async-close="true"
      :show-cancel-button="true"
      :cancel-text="$t('common.cancelText')"
      :confirm-text="$t('common.confirmText')"
    >
      <template #default>
        <div class="sell-form-content">
          <u-form :model="sellForm" ref="sellFormRef">
            <u-form-item prop="stock" :border-bottom="false">
              <u-input
                type="number"
                v-model="sellForm.stock"
                :placeholder="$t('order.sellPl')"
                border
              />
            </u-form-item>
            <div>
              <span>Amount obtained：{{}}</span>
              <span>{{ result }}</span>
            </div>
            <div>
              <span>Min：</span>
              <span>{{ sellForm.min }}</span>
              <span>Max：</span>
              <span>{{ sellForm.max }}</span>
            </div>
          </u-form>
        </div>
      </template>
    </u-modal>
    <my-tab-bar></my-tab-bar>
  </div>
</template>
<script setup name="Hall">
import { computed, ref } from "vue";
import { onPullDownRefresh, onReachBottom, onReady } from "@dcloudio/uni-app";
// import scrollList from "@/components/zh-scrollList/scrollList/scrollList";
import { getHallApi, saleApi } from "@/api/modules/hall";
import { useList } from "@/hooks/useList";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { cal } from "@/utils/cal";
import { requireR } from "@/regular";
import { getAssetsApi, getInfoApi } from "@/api/modules/my";
import { useAuthStore } from '@/store/modules/auth'

const { t } = useI18n();
useTitle({ title: t("page.hall") });

const authStore = useAuthStore();

const assetsInfo = ref({});
const userInfo = ref({});
const initData = async () => {
  const { data: assets = {} } = await getAssetsApi();
  const { data: user } = await getInfoApi();
  assetsInfo.value = assets || {};
  userInfo.value = user;
}
initData();
const scList = ref([]);

const dataCb = (data) => {
  const { tableDataInfo } = data.data;
  // scList.value = userFloorOrderVos.splice(0, 10);
  list.value = tableDataInfo.rows;
  pageable.value.total = tableDataInfo.total;
};
const loadCb = (data) => {
  console.log('data=', data)
  const { tableDataInfo } = data;
  // list.value.concat(tableDataInfo.rows)
  list.value = [...list.value, ...tableDataInfo.rows];
  console.log('[list.value, ...tableDataInfo.rows]=', [...list.value, ...tableDataInfo.rows])
  pageable.value.total = tableDataInfo.total;
};
const config = ref({
  api: getHallApi,
  dataCb,
  loadCb
});

const { pageable, list, isLoading, refreshList, loadMore } = useList(config);

const sellVisible = ref(false);
// Ref
const uModal1 = ref();
const sellFormRef = ref();
const sellForm = ref({
  stock: undefined,
  price: undefined,
  floorOrderId: undefined,
  min: undefined,
  max: undefined,
});
const rules = ref({
  stock: [requireR(t("hall.sellInputVali"))],
});

const openSell = (item) => {
  sellForm.value.price = item.price;
  sellForm.value.floorOrderId = item.id;
  sellForm.value.min = item.min;
  sellForm.value.max = item.max;
  sellVisible.value = true;
};

const onConfirm = async () => {
  if (!sellForm.value.stock) {
    uModal1.value.clearLoading();
    return uni.$u.toast(t("hall.sellInputVali"));
  }
  try {
    await saleApi(sellForm.value);
    uni.$u.toast(t("hall.sellSuccess"));
    sellVisible.value = false
  } catch (err) {
  } finally {
    uModal1.value.clearLoading();
  }
};
const onCancel = () => {
  sellForm.value = {
    stock: undefined,
    price: undefined,
    floorOrderId: undefined,
    min: undefined,
    max: undefined,
  };
};

const result = computed(() => {
  if (!sellForm.value.stock || !sellForm.value.price) {
    return 0.0;
  }
  return cal.mul(sellForm.value.stock, sellForm.value.price);
});
onReady(() => {
  sellFormRef?.value?.setRules(rules.value);
});
onPullDownRefresh(() => {
  refreshList();
});
onReachBottom(() => {
  console.log('onReachBottom')
  loadMore();
});
</script>
<style lang="scss" scoped>
.hall-container {
  padding: 20rpx;
  padding-bottom: 120rpx;
  .hall-title {
    padding-bottom: 40rpx;
    text-align: center;
    font-size: 60rpx;
    font-weight: 600;
  }
  .scroll-list-container {
    overflow: auto;
    box-sizing: border-box;
    padding: 0 20rpx;
    background-color: #fdf6ec;
  }
  .scroll-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    min-height: 60rpx;
    padding: 10rpx 10rpx;
    border-bottom: 1px solid #ccc;
    color: #000;
    font-size: 28rpx;
    .left {
      display: flex;
      align-items: center;
      width: 60rpx;
      .avatar {
        display: flex;
        align-items: center;
        padding-right: 10rpx;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding-left: 20rpx;
      .email {
        padding-right: $uni-6r;
      }
      .selling {
        display: flex;
        align-items: center;
        color: #ff9900;
        padding-right: $uni-6r;
        .label {
          padding-right: $uni-6r;
        }
      }
    }
  }
  .list-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10rpx 0 40rpx;
    font-size: 24rpx;
    .list-item-top {
      display: flex;
      align-items: center;
      height: 80rpx;
      padding-bottom: 20rpx;
      line-height: 80rpx;
      .avatar {
        // overflow: hidden;
        width: 60rpx;
        height: 60rpx;
        // border-radius: 50%;
      }
      .other-info {
        display: flex;
        flex-direction: column;
        padding-left: 20rpx;
        line-height: 24rpx;
        .username {
          padding-bottom: 10rpx;
        }
      }
      // .email {
      //   flex: 1;
      //   padding-left: 20rpx;
      // }
    }
    .list-item-center {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20rpx;
      .price,
      .ustd,
      .ustd2 {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 10rpx;
        .price-num,
        .ustd-num,
        .ustd2-num {
          padding-bottom: 10rpx;
          color: #fff;
        }
        .price-text,
        .ustd-text,
        .ustd2-text {
          color: #ccc;
        }
      }
      .ustd {
        border-left: 2rpx solid #333;
        border-right: 2rpx solid #333;
      }
    }
    .list-item-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 20rpx;
      border-top: 2rpx solid #333;
      border-bottom: 2rpx solid #333;
      .left {
        color: #ccc;
      }
    }
  }
}
.sell-form-content {
  padding: 40rpx 20rpx;
}
::v-deep .u-model {
  background-color: #333 !important;
}
</style>
