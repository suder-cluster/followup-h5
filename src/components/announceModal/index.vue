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
    detailInfo.value = {
      noticeId: "1802384588050317314",
      noticeTitle: "新手教程",
      noticeType: "2",
      noticeContent:
        '<h1>节气·夏至｜花开半夏，十里荷花</h1><p><span style="color: var(--weui-LINK);">中国太平洋保险</span>&nbsp;<span style="color: var(--weui-FG-2);">2024-06-21 00:29</span>&nbsp;<span style="color: var(--weui-FG-2);">上海</span></p><p class="ql-align-justify"><img src="https://mmbiz.qpic.cn/sz_mmbiz_gif/hfVicEsrSkJ583mGzSRgw8ZzFJmIFPbcTddC3df6z5xt4Av1Rl62xwicficu089c98XFa3p8HdOKAIGkeMAIkUHVg/640?wx_fmt=gif&amp;from=appmsg"></p><p class="ql-align-center"><br></p><p class="ql-align-center"><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/hfVicEsrSkJ5CWxiaDs5ibJqiajEpicZ84IKrzYU9bJz29bQiaBibFGPRl4nPcVzPHlcdYshFHGpwcHlyHr0zOiakPvCpA/640?wx_fmt=jpeg&amp;from=appmsg"></p><p class="ql-align-center"><br></p><p class="ql-align-justify"><img src="https://mmbiz.qpic.cn/sz_mmbiz_gif/hfVicEsrSkJ583mGzSRgw8ZzFJmIFPbcT99MHkeANg7DjbkRTOetOovoPqEqQZh16HrP072Qh2AEfxHsHjhY4Ow/640?wx_fmt=gif&amp;from=appmsg"></p><p>阅读&nbsp;3723</p><p>​</p><p>喜欢此内容的人还喜欢</p><p>太平洋医疗健康推出“细胞光钥计划”服务品牌</p><p><br></p><p>中国太平洋保险</p><p>不喜欢</p><p>不看的原因</p><p>确定</p><ul><li>内容低质不看此公众号内容</li></ul><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/hfVicEsrSkJ5CWxiaDs5ibJqiajEpicZ84IKruuAjgReIaQJjChuWCgMnjqU23Z1sglZmrP2wXz7fRCJ2KJEb8tFBZg/0?wx_fmt=jpeg"></p><p>防范非法集资集中宣传日｜天上不会掉馅饼</p><p><br></p><p>中国太平洋保险</p><p>不喜欢</p><p>不看的原因</p><p>确定</p><ul><li>内容低质不看此公众号内容</li></ul><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/hfVicEsrSkJ6Wws3KYUNojCv7hFryIfw7gth8B8QaeCN3jIU7aVI5CEvNj3I0D0VnsvZ9WGYCne2Uq5KSUI7gCw/0?wx_fmt=jpeg"></p><p>防汛抗旱｜“太保服务”筑牢灾害防护网</p><p><br></p><p>中国太平洋保险</p><p>不喜欢</p><p>不看的原因</p><p>确定</p><ul><li>内容低质不看此公众号内容</li></ul><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/hfVicEsrSkJ51ibBwJtibfvg9mwUIOficuibCtnlbrP4b31jWYa860O1ZArOpEGJ8asDKVuIhOJjpgXbrDsXiasXgQPg/0?wx_fmt=jpeg"></p><p><br></p>',
      status: "0",
      remark: null,
      createBy: 1,
      createByName: "admin",
      createTime: "2024-06-17 00:55:47",
    };
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
}
</style>
