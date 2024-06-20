<template>
  <div class="my-detail">
    <u-cell-group>
      <u-cell-item
        :title="$t('myDetail.avatar')"
        title-style="color: #000"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('myDetail.nickName')"
        :value="detailInfo.nickName"
        title-style="color: #000"
        value-style="color: #000"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('myDetail.email')"
        :value="detailInfo.email"
        title-style="color: #000"
        value-style="color: #000"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('myDetail.modifyPass')"
        :value="$t('myDetail.modify')"
        title-style="color: #000"
        value-style="color: #000"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
      ></u-cell-item>
      <u-cell-item
        :title="$t('myDetail.switchLang')"
        title-style="color: #000"
        value-style="color: #000"
        bg-color="#fdf6ec"
        :border-top="false"
        hover-class="hover-cell-item"
      ></u-cell-item>
    </u-cell-group>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { getInfoApi } from '@/api/modules/my';

const detailInfo = ref({});
const isLoading = ref(false)
const init = async () => {
  try {
    isLoading.value = true;
    const { data } = await getInfoApi()
    detailInfo.value = data;
  } catch(err) {

  } finally {
    isLoading.value = false;
  }
}
onShow(() => {
  init()
})
</script>
<style lang="scss" scoped>
.my-detail {
  padding: 20rpx;
  padding-bottom: 120rpx;
}
.hover-cell-item {
  // background-color:  !important;
}
</style>