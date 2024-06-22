<template>
  <view class="page-container">
    <u-swiper
      :autoplay="true"
      :circular="true"
      :indicator-dots="true"
      :interval="3000"
      :list="list"
      :height="300"
    ></u-swiper>
    <div class="grid-container">
      <u-grid :border="false" :col="4" border>
        <u-grid-item
          bg-color="#ff9900"
          @click="goToPage('person')"
          icon-style="color: #007aff"
        >
          <span class="iconfont icon-yonghuxiangqing f40"></span>
          <!-- <u-icon name="account-fill" :size="46"></u-icon> -->
          <view class="grid-text">{{ $t("my.myInfo") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#ff9900" @click="goToPage('assets')">
          <!-- <u-icon
            name="red-packet-fill"
            :size="46"
            icon-style="color: '#007aff'"
          ></u-icon> -->
          <span class="iconfont icon-zhanghuxiangqing f40"></span>
          <view class="grid-text">{{ $t("my.assets") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#ff9900" @click="goToPage('tutorial')">
          <!-- <u-icon
            name="photo"
            :size="46"
            icon-style="color: '#007aff"
          ></u-icon> -->
          <span class="iconfont icon-xinshoujiaocheng f40"></span>
          <view class="grid-text">{{ $t("my.tutorial") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#ff9900" @click="goToPage('custom')">
          <!-- <u-icon name="server-fill" :size="46" icon-style="color: #007aff"></u-icon> -->
          <span class="iconfont icon-lianxikefu f40"></span>
          <view class="grid-text">{{ $t("my.customer") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#ff9900">
          <span class="iconfont icon-tuandui f40"></span>
          <view class="grid-text">{{ $t("my.team") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#ff9900">
          <span class="iconfont icon-zijinrizhi f40"></span>
          <view class="grid-text">{{ $t("my.fundLog") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#ff9900" @click="goToPage('bind')">
          <span class="iconfont icon-zhanghubangding f40"></span>
          <view class="grid-text">{{ $t("my.binding") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#ff9900">
          <span class="iconfont icon-zijinliushui f40" @click="goToPage('accountDetail')"></span>
          <view class="grid-text">{{ $t("my.acDetail") }}</view>
        </u-grid-item>
      </u-grid>
    </div>

    <view class="currency-info">
      <view
        v-for="currency in currencies"
        :key="currency.symbol"
        class="currency-item"
      >
        <img
          v-if="currency.symbol === 'btcusdt'"
          class="currency-img"
          src="@/static/btc.webp"
        />
        <img
          v-if="currency.symbol === 'ethusdt'"
          class="currency-img"
          src="@/static/eth.webp"
        />
        <img
          v-if="currency.symbol === 'solusdt'"
          class="currency-img"
          src="@/static/sol.webp"
        />
        <view class="currency-name">{{ currency.symbol }} </view>
        <view class="currency-amount"
          >{{
            // 四舍五入取两位小数

            currency.amount
          }}
        </view>
      </view>
    </view>

    <!-- Horizontal Table for Cryptocurrencies -->
    <view class="crypto-table">
      <view
        v-for="crypto in cryptoList"
        :key="crypto.symbol"
        class="crypto-row"
      >
        <view class="crypto-name">{{ crypto.symbol }}</view>
        <view class="crypto-price">{{ crypto.amount }}</view>
      </view>
    </view>

    <my-tab-bar></my-tab-bar>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onHide, onShow } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/modules/auth";

import http from "@/api/http";

const Base_Url = import.meta.env.VITE_APP_BASE_API;

const { t } = useI18n();
useTitle({ title: t("page.home") });
const authStore = useAuthStore();

const hb = import.meta.env.VITE_HUOBI_API;

// @click="window.open('https://www.moyu-b1.xyz/chat/index/newChat/m/65e844e7bb06f','_blank')"
const list = ref([
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0F5_TuVM6mzv27Wr-A_eW9rjUarQ0lss1w&usqp=CAU",
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image:
      "https://lh5.googleusercontent.com/proxy/JhDH-Fa2INdc9fa1BvSGTXViqgeHjH9ND_wctUk77Qqaoa5fLYPCb13wKAl34rleJ7EBYO46QVkMt-_jILC7Q6N0lC4shB1CaYNFicxg0vR9BIWWtX3wKATDgdIyX3xsMYjSTu7JBHP38DQ",
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image:
      "https://p1.img.cctvpic.com/photoworkspace/2021/05/21/2021052112010285046.jpg",
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
]);

const currencies = ref([]);
const cryptoList = ref([]);
const timer = ref(null);
const fetchCryptoData = async () => {
  const response = await http.get(`${Base_Url}/h5/tickers`);

  const allCryptos = response.data.data;

  // 优先展示 BTC ETH XRP 过滤处理

  // 过滤和处理需要展示的加密货币数据
  currencies.value = allCryptos.filter((crypto) => {
    // 优先展示 BTC、ETH、XRP，这里可以根据 symbol 进行过滤
    return (
      crypto.symbol === "btcusdt" ||
      crypto.symbol === "ethusdt" ||
      crypto.symbol === "solusdt"
    );
  }); // Display the first 4 currencies
  cryptoList.value = allCryptos.slice(0, 10);
};

const interFetch = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  if (!authStore.token) {
    return;
  }
  timer.value = setInterval(() => {
    fetchCryptoData();
  }, 10000);
};
const clearFetch = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
};

const goToPage = (type) => {
  if (type === "person") {
    uni.navigateTo({
      url: "/pages/myDetail/index",
    });
  } else if (type === "assets") {
    uni.navigateTo({
      url: "/pages/my/assets/index",
    });
  } else if (type === 'bind') {
    uni.navigateTo({
      url: "/pages/accountBinding/index",
    });
  } else if (type === "custom") {
    uni.navigateTo({
      url: "/pages/custom/index",
    });
  } else if (type === "tutorial") {
    uni.navigateTo({
      url: "/pages/tutorial/index",
    });
  } else if (type === "accountDetail") {
    uni.navigateTo({
      url: "/pages/accountDetail/index"
    })
  }
};

onShow(() => {
  fetchCryptoData();
  interFetch();
});
onHide(() => {
  clearFetch();
});
</script>
<style lang="scss" scoped>
.page-container {
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx;
  padding-bottom: 120rpx;
}
.swiper-container {
  width: 100%;
  height: 400rpx;
  overflow: hidden;
  border-radius: 10rpx;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.grid-container {
  padding-top: 40rpx;
}
.swiper-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.currency-info {
  margin-top: 40rpx;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20rpx 20rpx;
  //background-color: #f8f8f8;
  border-radius: 16rpx;
  .currency-item {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 20rpx;
    transform: scale(0.8);
    img {
      width: 80rpx;
    }
    .currency-name {
      font-size: 32rpx;
      font-weight: bold;
    }
    .currency-amount {
      margin-top: 10rpx;
      font-size: 28rpx;
      color: #ff5454;
    }
  }
}

.crypto-table {
  margin-top: 40rpx;
  //background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.crypto-row {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 40rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.crypto-name {
  font-size: 32rpx;
  font-weight: bold;
}

.crypto-price {
  font-size: 32rpx;

  color: #ff5454;
}

.crypto-row:last-child {
  border-bottom: none;
}

.currency-img {
  // 兼容
  width: 100%;
  height: auto;
  object-fit: cover;
}
.iconfont {
  font-size: 40rpx;
}
.grid-text {
  padding-top: 10rpx;
}
::v-deep .u-grid-item {
  border-right: 2rpx solid #fff;
  border-bottom: 2rpx solid #fff;
  border-collapse: collapse;
}
</style>
