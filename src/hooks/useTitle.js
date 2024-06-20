import { onShow } from "@dcloudio/uni-app"
export const useTitle = (config) => {

  const setTitle = (title) => {
    uni.setNavigationBarTitle({
      title
    })
  }
  onShow(() => {
    setTitle(config.title);
  })
  
  return {
    setTitle
  }
}