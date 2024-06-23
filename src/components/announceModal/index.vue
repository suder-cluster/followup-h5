<template>
  <u-modal
    v-model="visible"
    :title="detailInfo.noticeTitle"
    show-cancel-button
    :cancel-text="$t('common.cancelText')"
    :confirm-text="$t('common.confirmText')"
  >
    <view class="slot-content">
      <scroll-view scroll-y="true"style="height: 100%">
        <rich-text :nodes="detailInfo.noticeContent"></rich-text>
      </scroll-view>
    </view>
  </u-modal>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getNoticeListApi } from "@/api/modules/notice";
import { useAuthStore } from "@/store/modules/auth";

const authStore = useAuthStore();
const visible = ref(false);

const detailInfo = ref({});

const init = async () => {
  if (!authStore.token) {
    return;
  }
  try {
    const { rows } = await getNoticeListApi({
      pageNum: 1,
      pageSize: 1,
      noticeType: "2",
    });
    detailInfo.value = rows?.length > 0 ? rows[0] : {};
    visible.value = true;
  } catch (err) {
  } finally {
  }
};

onMounted(() => {
  init();
});
</script>
<style lang="scss" scoped>
.slot-content {
  box-sizing: border-box;
  padding: 40rpx 20rpx;
  height: 400rpx;
}
::v-deep .u-model {
  background-color: #333 !important;
  .u-model__title {
    padding-top: 20rpx;
  }
}
</style>
