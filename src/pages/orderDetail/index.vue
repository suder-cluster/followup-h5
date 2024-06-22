<template>
  <div class="order-detail-container">
    <u-cell-group>
      <u-cell-item></u-cell-item>
      <u-cell-item></u-cell-item>
      <u-cell-item></u-cell-item>
    </u-cell-group>
  </div>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app';


onLoad((options) => {
  console.log('options=', options);
});
</script>
<style lang="scss" scoped></style>