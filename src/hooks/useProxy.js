import { getCurrentInstance } from 'vue';
export const useProxy = () => {
  const { proxy, appContext } = getCurrentInstance()
  
  const global = appContext.config.globalProperties
  return {
    proxy,
    global
  };
};
