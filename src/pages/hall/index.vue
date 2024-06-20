<template>
  <div class="hall-container">
    <div class="hall-title">
      {{ $t('hall.title') }}
    </div>
    <scrollList class="scroll-list" :list="scList" :time="200" :height="480" :line_height="80">
      <template #default="{ rows }">
        <div class="scroll-item">
          <div class="left">
            <div class="avatar">
              <u-avatar :src="rows.avatar" mode="square" :size="60"></u-avatar>
              {{ rows.avatar }}
            </div>
          </div>
          <div class="right">
            <div class="email">{{ rows.email || '516159562@qq.com' }}</div>
            <div class="selling">
              <span class="label">{{ $t('hall.selling') }}: </span>
              <span class="stock">{{ rows.stock }}</span>
            </div>
            <div class="usdt">
              <span>{{ $t('hall.usdt') }}: </span>
              <span>{{ rows.offsetDay }}{{ $t('hall.offsetDayUnit') }}</span>
            </div>
          </div>
        </div>
      </template>
    </scrollList>
    <my-tab-bar></my-tab-bar>
  </div>
</template>
<script setup name="Hall">
import { ref } from "vue";
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app';
import scrollList from "@/components/zh-scrollList/scrollList/scrollList";
import { getHallApi } from '@/api/modules/hall';
import { useList } from '@/hooks/useList';

const scList = ref([]);

const dataCb = (data) => {
  console.log('data=', data);
  const { userFloorOrderVos } = data;
  scList.value = userFloorOrderVos;
}
const config = ref({
  api: getHallApi,
  dataCb
});


const { list, isLoading, refreshList } = useList(config)

// const list = ref([
//   {
//     id: 1,
//     name: "用户1",
//     time: "54分钟前",
//   },
//   {
//     id: 2,
//     name: "用户2",
//     time: "54分钟前",
//   },
//   {
//     id: 3,
//     name: "用户3",
//     time: "54分钟前",
//   },
//   {
//     id: 4,
//     name: "用户4",
//     time: "54分钟前",
//   },
//   {
//     id: 5,
//     name: "用户5",
//     time: "54分钟前",
//   },
//   {
//     id: 6,
//     name: "用户6",
//     time: "54分钟前",
//   },
//   {
//     id: 7,
//     name: "用户7",
//     time: "54分钟前",
//   },
//   {
//     id: 8,
//     name: "用户8",
//     time: "54分钟前",
//   },
//   {
//     id: 9,
//     name: "用户9",
//     time: "54分钟前",
//   },
//   {
//     id: 10,
//     name: "用户10",
//     time: "54分钟前",
//   },
// ]);

onPullDownRefresh(() => {
  refreshList();
})
</script>
<style lang="scss" scoped>
.hall-container {
  padding: 20rpx;
  .hall-title {
    padding-bottom: 20px;
    text-align: center;
    font-size: 60rpx;
    font-weight: 600;
  }
  .scroll-list {
    box-sizing: border-box;
    padding: 0 20rpx;
    background-color: #fff;
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
}
</style>
