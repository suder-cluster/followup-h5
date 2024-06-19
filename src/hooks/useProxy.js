export const useProxy = () => {
  const { proxy } = getCurrentInstance();
  return {
    proxy
  };
};
