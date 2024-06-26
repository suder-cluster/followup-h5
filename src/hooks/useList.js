import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

export const useList = (config) => {
  console.log("config=", config);
  const isLoading = ref(false);
  const pageable = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const list = ref([]);
  // 刷新页面数据
  const refreshList = async () => {
    uni.startPullDownRefresh();
    const { params = {}, dataCb, api } = config.value;
    // 如果上一个接口还没完成则不请求数据
    if (isLoading.value) {
      return;
    }
    pageable.value.pageNum = 1;
    list.value = [];
    console.log("refreshList=");
    const requestParams = {
      pageNum: pageable.value.pageNum,
      pageSize: pageable.value.pageSize,
      ...params,
    };
    try {
      isLoading.value = true;
      const data = await api(requestParams);
      console.log("datadatadata=", data);
      if (dataCb) {
        dataCb(data);
        uni.stopPullDownRefresh();
        return;
      } else {
        list.value = data.rows;
        pageable.total = data.total;
        console.log("list=", list.value);
      }
    } catch (err) {
    } finally {
      isLoading.value = false;
      uni.stopPullDownRefresh();
    }
  };

  // 加载更多
  const loadMore = async () => {
    console.log("loadMore=");
    const { params = {}, loadCb, api } = config.value;
    if (pageable.value.pageNum * pageable.value.pageSize >= pageable.value.total || isLoading.value) {
      return;
    }
    pageable.value.pageNum = pageable.value.pageNum + 1;
    const requestParams = {
      pageNum: pageable.value.pageNum,
      pageSize: pageable.value.pageSize,
      ...params,
    };
    try {
      isLoading.value = true;
      console.log('requestParams=', requestParams)
      const { data } = await api(requestParams);
      if (loadCb) {
        loadCb(data);
        return;
      } else {
        list.value = [...list.value, ...data.list];
        pageable.total = data.total;
      }
    } catch (err) {
      pageable.value.pageNum--;
    } finally {
      isLoading.value = false;
    }
  };

  const init = () => {
    const { auto = true } = config.value;
    if (auto) {
      refreshList();
    }
  };
  onShow(() => {
    init();
  });
  return {
    pageable,
    list,
    refreshList,
    loadMore,
    init,
  };
};
