import { getCurrentInstance } from 'vue';
export const useProxy = () => {
  const { proxy } = getCurrentInstance();
  return {
    proxy
  };
};
