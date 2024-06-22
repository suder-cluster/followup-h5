<template>
  <div class="tutorial-container">
    <div class="tutorial-title">{{ detailInfo.noticeTitle }}</div>
    <u-parse :html="detailInfo.noticeContent"></u-parse>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getGuideBookApi } from "@/api/modules/notice";
import { onShow } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";

const detailInfo = ref({
  noticeId: undefined,
  noticeTitle: undefined,
  noticeType: undefined,
  noticeContent: "",
  status: undefined,
  remark: undefined,
  createBy: undefined,
  createByName: undefined,
  createTime: undefined,
});

const { t } = useI18n();
useTitle({ title: t("page.tutorial") });

const init = async () => {
  const { data } = await getGuideBookApi();
  detailInfo.value = data;
};

onShow(() => {
  init();
});
</script>
<style lang="scss" scoped>
.tutorial-container {
  padding: 0 20rpx;
  background-color: #fff;
  color: #000;
  .tutorial-title {
    padding: 10px 0;
    font-size: 28px;
    text-align: center;
  }
}
</style>
