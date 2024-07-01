<template>
  <div class="invite-container">
    <div class="code-container">
      <div class="code-item">
        <div class="code-title">{{ $t("invite.inviteCode") }}：</div>
        <div class="code-value">{{ qrCode }}</div>
      </div>
      <div class="code-item">
        <div class="code-title">{{ $t("invite.inviteUrl") }}：</div>
        <div class="code-value">
          <u-link :href="jumpUrl" :under-line="false">{{ jumpUrl }}</u-link>
        </div>
      </div>
    </div>
    <div class="qr-code" v-if="qrCodebase64">
      <img :src="qrCodebase64" />
    </div>
    <no-data v-else></no-data>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { getInviteCodeApi } from "@/api/modules/invite";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import QRCode from "qrcode";

const { t } = useI18n();
useTitle({ title: t("page.my") });
const qrCode = ref("");
const qrCodebase64 = ref("");
const jumpUrl = ref("");

const init = async () => {
  uni.startPullDownRefresh();
  try {
    const { data } = await getInviteCodeApi();
    qrCode.value = data;
    console.log("qrCode=", qrCode);
    generateQRCode(qrCode.value);
  } catch (err) {
  } finally {
    uni.stopPullDownRefresh();
  }
};
const generateQRCode = async (id) => {
  try {
    // 生成二维码
    const { origin } = window.location;
    const img = await QRCode.toDataURL(
      `${origin}/#/pages/registry/index?id=${id}`
    );
    jumpUrl.value = `${origin}/#/pages/registry/index?id=${id}`;
    // 将二维码图片转换为base64格式
    qrCodebase64.value = img;
    console.log("qrCodebase64.value=", qrCodebase64);
  } catch (error) {
    console.error("生成二维码失败:", error);
  }
};
onShow(() => {
  init();
});

onPullDownRefresh(() => {
  init();
});
</script>
<style lang="scss" scoped>
.invite-container {
  padding: 100rpx 40rpx;
  .code-container {
    padding: 20rpx 10rpx;
    margin-bottom: 40rpx;
    background-color: #e6a23c;
    border-radius: 10rpx;
  }
  .code-item {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding: 10rpx;
    font-size: 30rpx;
    .code-title {
      flex-basis: 300rpx;
    }
    .code-value {
      flex: 1;
    }
  }
  .qr-code {
    display: flex;
    justify-content: center;
    padding: 60rpx 20rpx;
    border-radius: 10rpx;
    background-color: #e6a23c;
  }
}
</style>
