export const requireR = (msg) => {
  return {
    required: true,
    message: `${msg}` || '该字段必填'
  };
};