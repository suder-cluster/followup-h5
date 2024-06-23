import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

export const useAllList = (config) => {
  const isLoading = ref(false);
  const list = ref([]);
  // 刷新页面数据
  const refreshList = async () => {
    const { params = {}, dataCb, api } = config.value
    // 如果上一个接口还没完成则不请求数据
    if (isLoading.value) {
      return
    }
    list.value = [];
    const requestParams = {
      ...params
    }
    console.log('requestParams=', requestParams)
    try {
      isLoading.value = true;
      uni.startPullDownRefresh();
      const data = await api(requestParams);
      console.log('datadatadata=', data)
      if (dataCb) {
        dataCb(data)
        uni.stopPullDownRefresh();
        return
      } else {
        list.value = data.data;
        uni.stopPullDownRefresh();
        console.log('list=', list.value)
      }
      
    } catch(err) {} finally {
      isLoading.value = false
    }
  }

  const init = () => {
    const { auto = true } = config.value;
    console.log('auto=', auto);
    if (auto) {
      refreshList()
    }
  }
  onShow(() => {
    init()
  })
  return {
    list,
    refreshList,
    init
  }
}