<template>
  <div class="my-container">
    <div class="person-info" @click="goToPage('myDetail')">
      <div class="left">
        <div class="avatar">
          <u-avatar :src="detailInfo.avatar" :size="100"></u-avatar>
        </div>
        <div class="info">
          <div class="top-content">
            <span class="name iconfont icon-VIP f40 vip-c1">{{
              showLevel
            }}</span>
          </div>
          <div class="bottom-text">{{ detailInfo.email || "--" }}</div>
        </div>
      </div>
      <div class="right">
        <u-icon name="arrow-right" :size="36" color="#969799"></u-icon>
      </div>
    </div>
    <div class="usdt-item">
      <div class="left">
        <span class="title">{{ $t("my.usdtTitle") }}</span>
        <span class="num">{{ detailInfo.usdtBalance }}</span>
      </div>
      <div class="right">
        <u-button plain size="mini" type="warning" @click="goToPage('recharge')"
          >{{ $t("my.recharge") }}
        </u-button>
      </div>
    </div>
    <div class="eur-item">
      <div class="left">
        <span class="title">{{ $t("my.eurTitle") }}</span>
        <span class="num">{{ detailInfo.euBalance }}</span>
      </div>
      <div class="right">
        <u-button plain size="mini" type="error" @click="goToPage('cashout')"
          >{{ $t("my.withDraw") }}
        </u-button>
      </div>
    </div>
    <u-cell-group>
      <u-cell-item
        v-for="item in cellList"
        :border-top="false"
        :index="item.index"
        :title="item.title"
        :value="item.value"
        bg-color="#000"
        hover-class="hover-cell-item"
        @click="onClickCell"
      >
        <template #icon>
          <span
            :class="['iconfont', `icon-${item.icon}`, 'f40', 'orange1', 'mr20']"
          ></span>
        </template>
      </u-cell-item>
    </u-cell-group>
    <switch-lang :visible.sync="visible" />
    <my-tab-bar></my-tab-bar>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { onShow, onPullDownRefresh } from "@dcloudio/uni-app";
import { getInfoApi } from "@/api/modules/my";
import { useLogin } from "@/hooks/useLogin";
import { useLang } from "@/hooks/useLang";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
useTitle({ title: t("page.my") });
const { onLogOut } = useLogin();
const { onSelectLang } = useLang();
const cellList = ref([
  {
    title: t("my.assets"),
    value: "",
    icon: "a-49zichan",
    index: 0,
  },
  {
    title: t("my.accountBinding"),
    value: "",
    icon: "zhanghubangding",
    index: 1,
  },
  {
    title: t("my.accountDetail"),
    value: "",
    icon: "zijinliushui",
    index: 2,
  },
  {
    title: t("my.team"),
    value: "",
    icon: "tuandui",
    index: 3,
  },
  {
    title: t("my.switchLang"),
    value: "",
    icon: "yuyanqiehuan",
    index: 4,
  },
  {
    title: t("my.invite"),
    value: "",
    icon: "wodeyaoqing",
    index: 5,
  },
  {
    title: t("my.logOut"),
    value: "",
    icon: "tuichudenglu",
    index: 6,
  },
]);

const showLevel = computed(() => {
  return detailInfo.value.vipLevel || "0";
});

const detailInfo = ref({
  userId: undefined,
  tenantId: undefined,
  deptId: undefined,
  userName: undefined,
  nickName: undefined,
  userType: undefined,
  email: undefined,
  phonenumber: undefined,
  sex: undefined,
  avatar: undefined,
  status: undefined,
  loginIp: undefined,
  loginDate: undefined,
  remark: undefined,
  createTime: undefined,
  deptName: undefined,
  roles: [],
  roleIds: undefined,
  postIds: undefined,
  roleId: undefined,
  vipLevel: undefined,
  minPayLimit: undefined,
  usdtBalance: undefined,
  euBalance: undefined,
  isReal: undefined,
  inviteCode: undefined,
  inviteUserId: undefined,
});
const init = async () => {
  uni.startPullDownRefresh();
  try {
    const { data } = await getInfoApi();
    detailInfo.value = data;
  } catch (err) {
  } finally {
    uni.stopPullDownRefresh();
  }
};
const goToPage = (type) => {
  if (type === "myDetail") {
    uni.navigateTo({
      url: "/pages/myDetail/index",
    });
  } else if (type === "recharge") {
    uni.navigateTo({
      url: "/pages/recharge/index",
    });
  } else if (type === "cashout") {
    uni.navigateTo({
      url: "/pages/cashout/index",
    });
  }
};
const onClickCell = (value) => {
  if (value === 0) {
    uni.navigateTo({
      url: "/pages/my/assets/index",
    });
  } else if (value === 1) {
    uni.navigateTo({
      url: "/pages/accountBinding/index",
    });
  } else if (value === 2) {
    uni.navigateTo({
      url: "/pages/accountDetail/index",
    });
  } else if (value === 3) {
    uni.navigateTo({
      url: "/pages/team/index",
    });
  } else if (value === 4) {
    onSelectLang();
  } else if (value === 5) {
    uni.navigateTo({
      url: "/pages/myInvite/index",
    });
  } else if (value === 6) {
    onLogOut();
  }
};
onShow(() => {
  init();
});
onPullDownRefresh(() => {
  init();
})
</script>
<style lang="scss" scoped>
.my-container {
  padding: 20rpx;
  padding-bottom: 120rpx;

  .person-info {
    display: flex;
    justify-content: space-between;
    padding: 40rpx 28rpx 40rpx 0;

    .left {
      display: flex;
      align-items: center;

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 30rpx;

        .top-content {
          display: flex;
          // height: 60rpx;
          // line-height: 60rpx;
          font-size: 32rpx;
          .name {
            margin-right: 10rpx;
          }
        }

        .bottom-text {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 24rpx;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
    }
  }

  .usdt-item,
  .eur-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    padding: 20rpx;
    border: 2rpx solid #ccc;
    background-color: #fdf6ec;

    .left {
      display: flex;
      flex-direction: column;

      .title {
        color: #909399;
        font-size: 32rpx;
        line-height: 46rpx;
      }

      .num {
        color: #333;
        font-size: 32rpx;
      }
    }
  }
}

.hover-cell-item {
  background-color: #222 !important;
}
</style>
