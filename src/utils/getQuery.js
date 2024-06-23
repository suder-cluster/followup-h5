// 获取query参数
export const getQuery = (href) => {
  let url = href || "";
  if (!href) {
    url = window.location.href;
  }
  //声明参数字典
  let requestDic = {};
  //确定URL中包含 ？
  if (url.indexOf("?") !== -1) {
    //返回 ？ 后面的字符串
    let str = url.substr(url.indexOf("?") + 1);
    //通过 & 符号分割字符串，获取参数数组
    let strArray = str.split("&");
    //遍历参数数组
    for (let i = 0; i < strArray.length; i++) {
      //把遍历到的每一个元素再以 = 分割，分割后第0为作为key，第一位作为value 存放到字典中
      requestDic[strArray[i].split("=")[0]] = decodeURI(
        strArray[i].split("=")[1]
      );
    }
  }
  return requestDic || {};
};
