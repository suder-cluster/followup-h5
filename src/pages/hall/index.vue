<template>
  <div class="hall-container">
    <div class="hall-title">
      {{ $t("hall.title") }}
    </div>
    <scrollList
      v-loading="isLoading"
      class="scroll-list"
      :list="scList"
      :time="200"
      :height="480"
      :line_height="80"
    >
      <template #default="{ rows }">
        <div class="scroll-item">
          <div class="left">
            <div class="avatar">
              <u-avatar :src="rows.avatar" mode="circle" :size="60" style="overflow: hidden;"></u-avatar>
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
      </template>
    </scrollList>
    <!-- <div class="tabs">
      <u-subsection style="width: 100%;" :list="tabs" v-model="currentTab" active-color="#ff9900" @change="onChangeTab"></u-subsection>
    </div> -->
    <div class="list-container">
      <div class="list-item" v-for="item in list" :key="id">
        <div class="list-item-top">
          <div class="avatar">
            <u-avatar mode="circle" :size="60"></u-avatar>
          </div>
          <div class="email">{{ item.email }}</div>
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
            <span>{{ $t('hall.limit') }}: </span>
            <span>{{ item.min }}-{{ item.max }}&nbsp;&nbsp;USDT</span>
          </div>
          <div class="right">
            <u-button type="warning" shape="circle" size="mini" @click="openSell(item)">{{ $t('hall.goSale') }}</u-button>
          </div>
        </div>
      </div>
    </div>
    <u-modal v-model="sellVisible" @confirm="onConfirm" ref="uModal1" :async-close="true"></u-modal>
    <my-tab-bar></my-tab-bar>
  </div>
</template>
<script setup name="Hall">
import {ref} from "vue";
import {onPullDownRefresh, onReachBottom} from "@dcloudio/uni-app";
import scrollList from "@/components/zh-scrollList/scrollList/scrollList";
import {getHallApi} from "@/api/modules/hall";
import {useList} from "@/hooks/useList";


const scList = ref([]);

const dataCb = (data) => {
  const { userFloorOrderVos, tableDataInfo } = data.data;
  scList.value = userFloorOrderVos;
  list.value = tableDataInfo.rows;
  pageable.value.total = tableDataInfo.total;
};
const config = ref({
  api: getHallApi,
  dataCb,
});

const { pageable, list, isLoading, refreshList, loadMore } = useList(config);

const sellVisible = ref(false);

const openSell = (item) => {
  console.log('item=', item);
  sellVisible.value = true;
}

const onConfirm = () => {
  console.log('确定')
}

onPullDownRefresh(() => {
  refreshList();
});
onReachBottom(() => {
  loadMore()
})
</script>
<style lang="scss" scoped>
.hall-container {
  padding: 20rpx;
  padding-bottom: 120rpx;
  .hall-title {
    padding-bottom: 20px;
    text-align: center;
    font-size: 60rpx;
    font-weight: 600;
  }
  .scroll-list {
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
      .email {
        flex: 1;
        padding-left: 20rpx;
      }
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
</style>
