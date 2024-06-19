import { getCurrentInstance } from 'vue';
export const useProxy = () => {
  const { appContext } = getCurrentInstance()
  const { proxy } = getCurrentInstance()
  
  const global = appContext.config.globalProperties
  return {
    proxy,
    global
  };
};
