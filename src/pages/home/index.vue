<template>
  <view class="page-container">
    <u-swiper
      :autoplay="true"
      :circular="true"
      :indicator-dots="true"
      :interval="3000"
      :list="list"
      :height="400"
    ></u-swiper>
    <div class="grid-container">
      <u-grid :border="false" :col="4" border>
        <u-grid-item
          bg-color="#252525"
          @click="goToPage('person')"
          icon-style="color: #007aff"
        >
          <span class="iconfont icon-yonghuxiangqing f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.myInfo") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#252525" @click="goToPage('assets')">
          <span class="iconfont icon-a-49zichan f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.assets") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#252525" @click="goToPage('tutorial')">
          <span class="iconfont icon-xinshoujiaocheng f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.tutorial") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#252525" @click="goToPage('custom')">
          <span class="iconfont icon-lianxikefu f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.customer") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#252525" @click="goToPage('team')">
          <span class="iconfont icon-tuandui f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.team") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#252525" @click="goToPage('invite')">
          <span class="iconfont icon-wodeyaoqing f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.invite") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#252525" @click="goToPage('bind')">
          <span class="iconfont icon-zhanghubangding f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.binding") }}</view>
        </u-grid-item>
        <u-grid-item bg-color="#252525" @click="goToPage('accountDetail')">
          <span class="iconfont icon-zijinliushui f40"></span>
          <view class="grid-text line-ellipsis">{{ $t("my.acDetail") }}</view>
        </u-grid-item>
      </u-grid>
    </div>
    <u-notice-bar
      mode="horizontal"
      :list="[detailInfo.noticeTitle]"
      bg-color="#252525"
      color="#fff"
      :speed="100"
    ></u-notice-bar>
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
        <view class="currency-name">
          <span>{{
            currency.symbol.slice(0, currency.symbol.length - 4).toUpperCase() +
            "/"
          }}</span>
          <span style="color: #8f8d8e">{{
            //    crypto.symbol
            currency.symbol
              .slice(currency.symbol.length - 4, currency.symbol.length)
              .toUpperCase()
          }}</span>
        </view>
        <view class="currency-amount line-ellipsis">
          {{ new Decimal(currency.close || 0).toFixed(2) }}
        </view>
        <view class="currency-ratio">
          <div v-if="currency.ratio === undefined">0.00%</div>
          <div v-else-if="currency.ratio === 0">{{ currency.ratio }}%</div>
          <div class="green" v-else-if="currency.ratio > 0">
            <span class="iconfont icon-shangsheng"></span>
            <span>+{{ currency.ratio }}%</span>
          </div>
          <div v-else class="red">
            <span class="iconfont icon-xiajiang"></span>
            <span>{{ currency.ratio }}%</span>
          </div>
        </view>
      </view>
    </view>

    <!-- Horizontal Table for Cryptocurrencies -->
    <view class="crypto-table" v-if="cryptoList.length > 0">
      <view
        v-for="crypto in cryptoList"
        :key="crypto.symbol"
        class="crypto-row"
      >
        <view class="crypto-name line-ellipsis">
          <span>{{ crypto.symbol.slice(0, -4).toUpperCase() }}/</span>
          <span style="color: #8f8d8e">{{
            crypto.symbol.slice(-4).toUpperCase()
          }}</span>
        </view>
        <view class="crypto-price line-ellipsis">
          <span>{{ crypto.close }}</span>
        </view>
        <view class="crypto-ratio line-ellipsis">
          <div v-if="crypto.ratio === undefined">0.00%</div>
          <div v-else-if="crypto.ratio === 0">0.00%</div>
          <div v-else-if="crypto.ratio > 0" class="green">
            <span class="iconfont icon-shangsheng"></span>
            <span>+{{ new Decimal(crypto.ratio || 0).toFixed(2) }}%</span>
          </div>
          <div v-else class="red">
            <span class="iconfont icon-xiajiang"></span>
            <span>{{ new Decimal(crypto.ratio || 0).toFixed(2) }}%</span>
          </div>
        </view>
      </view>
    </view>
    <no-data v-else></no-data>
    <my-tab-bar></my-tab-bar>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onHide, onShow, onLoad } from "@dcloudio/uni-app";
import { useTitle } from "@/hooks/useTitle";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/modules/auth";
// import AnnounceModal from "@/components/announceModal";
import Decimal from "decimal.js";
import { cal } from "@/utils/cal";
import { getNoticeListApi } from "@/api/modules/notice";
import { getConfigKey } from "@/api/modules/config";
import aa from "@/static/images/home/aa.png";
import bb from "@/static/images/home/bb.png";
import cc from "@/static/images/home/cc.png";

import http from "@/api/http";

const Base_Url = import.meta.env.VITE_APP_BASE_API;

const { t } = useI18n();
useTitle({ title: t("page.home") });
const authStore = useAuthStore();

const hb = import.meta.env.VITE_HUOBI_API;

// @click="window.open('https://www.moyu-b1.xyz/chat/index/newChat/m/65e844e7bb06f','_blank')"
const list = ref([
  {
    image: aa,
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image: bb,
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image: cc,
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
]);

const currencies = ref([]);
const lastSecondCurrencies = ref([]);
const cryptoList = ref([]);
const lastSecondCryptoList = ref([]);
const timer = ref(null);
const detailInfo = ref({});
const url = ref('')

const fetchCryptoData = async () => {
  const response = await http.get(`${Base_Url}/h5/tickers`);

  const allCryptos = response.data.data;

  // 优先展示 BTC ETH XRP 过滤处理

  // 过滤和处理需要展示的加密货币数据
  lastSecondCurrencies.value = currencies.value;
  currencies.value = allCryptos.filter((crypto) => {
    // 优先展示 BTC、ETH、XRP，这里可以根据 symbol 进行过滤
    return (
      crypto.symbol === "btcusdt" ||
      crypto.symbol === "ethusdt" ||
      crypto.symbol === "solusdt"
    );
  }); // Display the first 4 currencies\
  lastSecondCryptoList.value = cryptoList.value;
  cryptoList.value = allCryptos.filter((crypto) => {
    // 优先展示 BTC、ETH、XRP，这里可以根据 symbol 进行过滤
    return (
      crypto.symbol === "btcusdt" ||
      crypto.symbol === "ethusdt" ||
      crypto.symbol === "xrpusdt" ||
      crypto.symbol === "notusdt" ||
      crypto.symbol === "solusdt" ||
      crypto.symbol === "zrousdt" ||
      crypto.symbol === "tonusdt" ||
      crypto.symbol === "trbusdt" ||
      crypto.symbol === "wldusdt" ||
      crypto.symbol === "filusdt"
    );
  });

  for (let i = 0; i < currencies.value.length; i++) {
    const ratio = cal.div(
      cal.sub(
        currencies.value[i].close || 0,
        lastSecondCurrencies.value[i].close || 0
      ),
      lastSecondCurrencies.value[i].close || 0
    );
    currencies.value[i].ratio = cal.mul(ratio, 100).toFixed(2);
  }

  for (let i = 0; i < cryptoList.value.length; i++) {
    const ratio = cal.div(
      cal.sub(
        cryptoList.value[i].close || 0,
        lastSecondCryptoList.value[i].close || 0
      ),
      lastSecondCryptoList.value[i].close || 0
    );
    cryptoList.value[i].ratio = cal.mul(ratio, 100).toFixed(2);
  }
};

const getConfig = async () => {
  const { data } = await getConfigKey("h5.custom.url");
  url.value = data
}

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
  } else if (type === "bind") {
    uni.navigateTo({
      url: "/pages/accountBinding/index",
    });
  } else if (type === "team") {
    uni.navigateTo({
      url: "/pages/team/index",
    });
  } else if (type === "custom") {
    // window.open(url.value, '_blank');
    uni.navigateTo({
      url: "/pages/custom/index",
    });
  } else if (type === "tutorial") {
    uni.navigateTo({
      url: "/pages/tutorial/index",
    });
  } else if (type === "accountDetail") {
    uni.navigateTo({
      url: "/pages/accountDetail/index",
    });
  } else if (type === "invite") {
    uni.navigateTo({
      url: "/pages/myInvite/index",
    });
  }
};
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
onShow(() => {
  fetchCryptoData();
  interFetch();
  init();
});
onLoad(() => {
  if (!authStore.token) {
    return;
  }
  getConfig()
})
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
  margin-bottom: 20rpx;
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
  background-color: #252525;
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
      width: 100%;
      margin-top: 10rpx;
      font-size: 28rpx;
      color: #ff5454;
      text-align: center;
    }
  }
}

.crypto-table {
  margin-top: 40rpx;
  background-color: #252525;
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
  flex: 1;
  font-size: 32rpx;
  font-weight: bold;
}

.crypto-price {
  width: 180rpx;
  font-size: 32rpx;
  color: #ff5454;
}
.crypto-ratio {
  width: 140rpx;
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
.icon-shangsheng,
.icon-xiajiang {
  font-size: 30rpx;
}
.grid-text {
  width: 100%;
  padding-top: 10rpx;
  text-align: center;
}
.green {
  color: #19be6b;
}
.red {
  color: red;
}
</style>
