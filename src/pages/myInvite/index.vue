<template>
  <div class="invite-container">
    <div class="qr-code">
      <img :src="qrCodebase64" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app';
import { getInviteCodeApi } from '@/api/modules/invite';
import {useTitle} from "@/hooks/useTitle";
import {useI18n} from "vue-i18n";
import QRCode from 'qrcode'

const {t} = useI18n();
useTitle({title: t("page.my")});
const qrCode = ref('');
const qrCodebase64 = ref('')
const init = async () => {
  uni.startPullDownRefresh()
  try {
    const { data } = await getInviteCodeApi() 
    console.log('data=', data)
    qrCode.value = data || 'http://107.149.212.34:5932/#/pages/registry/index?invideCode=111111';
    generateQRCode(qrCode.value)
  } catch(err) {

  } finally {
    uni.stopPullDownRefresh();
  }
}
const generateQRCode = async (text) => {
      try {
        // 生成二维码
        const img = await QRCode.toDataURL(text);
        // 将二维码图片转换为base64格式
        qrCodebase64.value = img;
        console.log('qrCodebase64.value=', qrCodebase64)
      } catch (error) {
        console.error('生成二维码失败:', error);
      }
    }
onShow(() => {
  init();
});

onPullDownRefresh(() => {
  init();
})
</script>
<style lang="scss" scoped>
.invite-container {
  padding: 20rpx 40rpx;
  .qr-code {
    display: flex;
    justify-content: center;
    padding: 60rpx 20rpx;
    border-radius: 10rpx;
    background-color: #e6a23c;
  }
}
</style>