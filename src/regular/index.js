export const requireR = (msg) => {
  return {
    required: true,
    message: `${msg}` || '该字段必填',
    trigger: ['blur', 'change']
  };
};
export const emailR = (msg) => {
  return {
    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    message: `${msg}` || '邮箱格式不正确',
    trigger: ['blur', 'change']
  }
}