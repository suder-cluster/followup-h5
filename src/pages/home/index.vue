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
    <view class="currency-info">
      <view v-for="currency in currencies" :key="currency.symbol" class="currency-item">
        <view class="currency-name">{{ currency.symbol }}</view>
        <view class="currency-amount">{{ currency.amount }}</view>

      </view>
    </view>

    <!-- Horizontal Table for Cryptocurrencies -->
    <view class="crypto-table">
      <view v-for="crypto in cryptoList" :key="crypto.symbol" class="crypto-row">
        <view class="crypto-name">{{ crypto.symbol }}</view>
        <view class="crypto-price">{{ crypto.amount }}</view>
      </view>
    </view>


    <my-tab-bar></my-tab-bar>
  </view>
</template>

<script setup>
import {onMounted, ref} from "vue";

const hb = import.meta.env.VITE_HUOBI_API;


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

const currencies = ref([]);
const cryptoList = ref([]);
const fetchCryptoData = async () => {

  const response = await uni.request({
    url: "http://localhost/huobi-api/market/tickers?symbol=btceur",
    method: "GET",
  });

  const allCryptos = response.data.data;

  // 优先展示 BTC ETH XRP 过滤处理

  // 过滤和处理需要展示的加密货币数据
  const filteredCryptos = allCryptos.filter(crypto => {
    // 优先展示 BTC、ETH、XRP，这里可以根据 symbol 进行过滤
    return crypto.symbol === 'btcusdt' || crypto.symbol === 'ethusdt' || crypto.symbol === 'solusdt';
  });

  currencies.value = filteredCryptos;  // Display the first 4 currencies
  cryptoList.value = allCryptos.slice(0, 10);
};

onMounted(() => {
  fetchCryptoData();
});

// 一秒刷新一次
setInterval(() => {
  fetchCryptoData();
}, 60000);


</script>
<style lang="scss" scoped>

.currency-info {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.currency-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.currency-name {
  font-size: 16px;
  font-weight: bold;
}

.currency-amount {
  margin-top: 5px;
  font-size: 14px;
  color: #333;
}

.crypto-table {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.crypto-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.crypto-name {
  font-size: 16px;
  font-weight: bold;
}

.crypto-price {
  font-size: 16px;
  color: #333;
}

.crypto-row:last-child {
  border-bottom: none;
}
</style>
