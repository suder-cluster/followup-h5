<template>
  <view class="page-container">
    <u-swiper :list="list"></u-swiper>
    <u-grid :col="4" :border="false">
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">我的资产</view>
      </u-grid-item>
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">资产日志</view>
      </u-grid-item>
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">账户详情</view>
      </u-grid-item>
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">账户绑定</view>
      </u-grid-item>
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">团队列表</view>
      </u-grid-item>
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">注册邀请</view>
      </u-grid-item>
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">新手教程</view>
      </u-grid-item>
      <u-grid-item>
        <u-icon name="photo" :size="46"></u-icon>
        <view class="grid-text">联系我们</view>
      </u-grid-item>
    </u-grid>
    <my-tab-bar></my-tab-bar>
  </view>
</template>

<script setup>
import { ref } from "vue";

const list = ref([
  {
    image: "https://cdn.uviewui.com/uview/swiper/1.jpg",
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image: "https://cdn.uviewui.com/uview/swiper/2.jpg",
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image: "https://cdn.uviewui.com/uview/swiper/3.jpg",
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
]);
</script>
<style lang="scss" scoped></style>
